import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ResourceSubmissionService {

  constructor(private https: HttpClient) {}

  submissionUrl = 'https://script.google.com/macros/s/AKfycbxmzJuQOT0V1RngU5wiW99Y5ats4heH_jldxu0YcYK6xDKh3mA/exec';

  postResourceForm(request: any): Observable<any> {

    console.log("entered ResourceSubmission.postResourceForm")
    let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    let options = {headers: headers}
    return this.https.post<any>(this.submissionUrl, JSON.stringify(request), options)

    //use for mocking of submission.  no post will be made
    //return of(null).pipe(delay(2000))
    };
  

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
