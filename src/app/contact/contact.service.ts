import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Panels} from '../model/Panels';
import {TableData} from '../model/TableData';
import { Contact } from '../model/Contact';


@Injectable()
export class ContactService {
  constructor(private https: HttpClient) {}

  contactUrl = 'https://spreadsheets.google.com/feeds/list/1Qx0ckOsye46DYvFed8zA02I0mZSb-cvNOlAOuwRq4ZQ/1/public/full?alt=json';

  postContactForm(contact: Contact): Observable<Contact> {
    return this.https.post<Contact>(this.contactUrl, contact);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
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
