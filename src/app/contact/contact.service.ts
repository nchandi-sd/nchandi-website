import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {Observable, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Panels} from '../model/Panels';
import {TableData} from '../model/TableData';
import { Contact } from '../model/Contact';


@Injectable()
export class ContactService {
  constructor(private https: HttpClient) {}

  contactUrl = 'https://script.google.com/macros/s/AKfycbzezNitOBOTReBZ7kvtV8fzTEiW-bA8mGOnJDQl7orAr65gvRd8/exec';

  postContactForm(contact: Contact): Observable<Contact> {

    console.log("entered ContactForm.postConactForm")
    let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    let options = {headers: headers}
    return this.https.post<Contact>(this.contactUrl, JSON.stringify(contact), options)
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
