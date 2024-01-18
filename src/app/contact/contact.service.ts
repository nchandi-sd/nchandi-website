import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {Observable, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Panels} from '../model/Panels';
import {TableData} from '../model/TableData';
import { Contact } from '../model/Contact';
import { environment } from 'src/environments/environment';
import { env } from 'process';


@Injectable()
export class ContactService {
  constructor(private https: HttpClient) {

  }

  /* contactUrl = 'https://script.google.com/macros/s/AKfycbzezNitOBOTReBZ7kvtV8fzTEiW-bA8mGOnJDQl7orAr65gvRd8/exec'; */
  contactUrl = "https://nchandi-serverless-functions.vercel.app/api/contact" /* `https://nchandi-email.herokuapp.com/` */;

  postContactForm(contact: Contact) {

    console.log("entered ContactForm.postConactForm", contact)
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    let options = {headers: headers}

    var body = () => {
      let i = 0
      let theBody = ""
      while(i < Object.keys(contact).length){
        let keyList = Object.keys(contact)
        let valueList = Object.values(contact)
        theBody += `<h3>${keyList[i]}</h3><p>${valueList[i]}</p>`
        i++
      }
      return theBody
    }

    console.log("body", body(), environment.user, options)

    /* return this.emailPipe.transform(`smtp.gmail.com`, environment.user, environment.password, "info@nchandi.org", environment.user, "Contact", body()) */


    return this.https.post(this.contactUrl, contact).subscribe(res => console.log("res", res))
    };


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log("entered ContactForm.handleError ERROR")
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