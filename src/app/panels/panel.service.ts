import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface OPENINGS {
  dayOfWeek: string;
  weekOfMonth: string;
  time: string;
  facility: string;
  location: string;
  gender: string;
  numberNeeded: string;
  panelCordinator: string;
  boardChampion: string;
}

@Injectable()
export class PanelService {
  constructor(private http: HttpClient) {}

  testURL = 'https://spreadsheets.google.com/feeds/list/1Qx0ckOsye46DYvFed8zA02I0mZSb-cvNOlAOuwRq4ZQ/1/public/full?alt=json';

  getOpenings() {
    return this.http.get<OPENINGS>(this.testURL)
      .pipe(retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getOpenings2() {
    // now returns an Observable of Config
    return this.http.get<OPENINGS>(this.testURL);
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
