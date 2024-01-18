import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import { delay } from 'rxjs/operators';
import { EmailValidator } from '@angular/forms';
import { SortPanelMembersByEmailPipe } from '../sort-panel-members-by-email.pipe';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ResourceSubmissionService {

  constructor(
    private https: HttpClient
    ) {}

  /* submissionUrl = 'https://script.google.com/macros/s/AKfycbxmzJuQOT0V1RngU5wiW99Y5ats4heH_jldxu0YcYK6xDKh3mA/exec'; */
  submissionUrl = "https://nchandi-serverless-functions.vercel.app/api/resources" /* `https://nchandi-email.herokuapp.com/resources` */;

  postResourceForm(request: any) {

    console.log("entered ResourceSubmission.postResourceForm")
    let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    let options = {headers: headers}

    var body = () => {
      let i = 0
      let theBody = ""
      while(i < Object.keys(request).length){
        let keyList = Object.keys(request)
        let valueList = Object.values(request)
        theBody += `<h3>${keyList[i]}</h3><p>${valueList[i]}</p>`
        i++
      }
      return theBody
    }

    console.log("body", body())

    let postRequest = {
      fromAddress: environment.user,
      toAddress: "literature@nchandi.org, info@nchandi.org, facilities@nchandi.org",
      subject: "Resources Request",
      content: body(),
   }

    /* return this.emailPipe.transform(`smtp.gmail.com`, environment.user, environment.password, ["literature@nchandi.org", "info@nchandi.org", "facilities@nchandi.org"], environment.user, "Literature Order", body()) */
    this.https.post<any>(this.submissionUrl, request).subscribe(res => console.log("res", res))
    return this.https.post<any>(this.submissionUrl, request).subscribe(res => console.log("res", res))
  }



    //use for mocking of submission.  no post will be made
    //return of(null).pipe(delay(2000))


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log("entered ResourceSubmission.postResourceForm ERROR")
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}