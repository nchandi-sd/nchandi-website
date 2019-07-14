import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Panels} from '../model/Panels';
import {TableData} from '../model/TableData';


@Injectable()
export class PanelService {
  constructor(private https: HttpClient) {}

  openingsUrl = 'https://spreadsheets.google.com/feeds/list/1Qx0ckOsye46DYvFed8zA02I0mZSb-cvNOlAOuwRq4ZQ/1/public/full?alt=json';
  currentPanelsUrl = 'https://spreadsheets.google.com/feeds/list/1PjgurqbvzGUD1ibjONLghHx3NdJVV7j6ZWXHyf4dLgs/od6/public/full?alt=json';
  correctionalFacilitiesUrl = 'https://spreadsheets.google.com/feeds/list/1PjgurqbvzGUD1ibjONLghHx3NdJVV7j6ZWXHyf4dLgs/ong6kbe/public/full?alt=json';

  // getOpenings() {
  //   return this.https.get<EntryEntity[]>(this.testURL)
  //     .pipe(retry(3), // retry a failed request up to 3 times
  //       catchError(this.handleError) // then handle the error
  //     );
  // }

  getOpenings(): Observable<TableData> {
    return this.https.get<TableData>(this.openingsUrl);
  }

  getCurrentPanels(): Observable<Panels> {
    return this.https.get<Panels>(this.currentPanelsUrl);
  }

  getCorrectionalFacilities(): Observable<Panels> {
    return this.https.get<Panels>(this.correctionalFacilitiesUrl);
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
