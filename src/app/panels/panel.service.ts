import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Weather {
  version: string;
  encoding: string;
  feed: Feed;
}
export interface Feed {
  xmlns: string;
  xmlns$openSearch: string;
  xmlns$gsx: string;
  id: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  updated: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  category?: (CategoryEntity)[] | null;
  title: TitleOrContent;
  link?: (LinkEntity)[] | null;
  author?: (AuthorEntity)[] | null;
  openSearch$totalResults: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  openSearch$startIndex: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  entry?: (EntryEntity)[] | null;
}
export interface NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex {
  $t: string;
}
export interface CategoryEntity {
  scheme: string;
  term: string;
}
export interface TitleOrContent {
  type: string;
  $t: string;
}
export interface LinkEntity {
  rel: string;
  type: string;
  href: string;
}
export interface AuthorEntity {
  name: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  email: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
}
export interface EntryEntity {
  id: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  updated: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  category?: (CategoryEntity)[] | null;
  title: TitleOrContent;
  content: TitleOrContent;
  link?: (LinkEntity)[] | null;
  gsx$dayofweek: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$weekofmonth: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$time: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$facility: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$location: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$menwomen: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$needed: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$panelcoordinator: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
  gsx$boardchampion: NameOrEmailOrIdOrUpdatedOrGsx$dayofweekOrGsx$weekofmonthOrGsx$timeOrGsx$facilityOrGsx$locationOrGsx$menwomenOrGsx$neededOrGsx$panelcoordinatorOrGsx$boardchampionOrOpenSearch$totalResultsOrOpenSearch$startIndex;
}


@Injectable()
export class PanelService {
  constructor(private http: HttpClient) {}

  testURL = 'https://spreadsheets.google.com/feeds/list/1Qx0ckOsye46DYvFed8zA02I0mZSb-cvNOlAOuwRq4ZQ/1/public/full?alt=json';

  getOpenings() {
    return this.http.get<EntryEntity[]>(this.testURL)
      .pipe(retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getOpenings2(): Observable<EntryEntity[]> {
    // now returns an Observable of Config
    return this.http.get<EntryEntity[]>(this.testURL);
  }

  getOpenings3() {
    return this.http.get<any>(this.testURL);
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
