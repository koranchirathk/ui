import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiURL: string = environment.baseUrl;
  moduleURL = 'admin';
  currentUserDetails: any = {};
  constructor(private router: Router, private httpClient: HttpClient) { }

  getAllGroups(accessToken: string) {
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json;'
      }
    };

    return this.httpClient
      .get(`${this.apiURL}${this.moduleURL}/getallgroups`, headers)
      .pipe(catchError(this.handleError));
  }

  updateTheGroup(accessToken: string, groupDetails: any) {
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json;'
      }
    };

    return this.httpClient
      .put(`${this.apiURL}${this.moduleURL}/updategroup`, groupDetails, headers)
      .pipe(catchError(this.handleError));
  }

  addGroup(accessToken: string, groupDetails: any) {
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json;'
      }
    };

    return this.httpClient
      .post(`${this.apiURL}${this.moduleURL}/addgroup`, groupDetails,  headers)
      .pipe(catchError(this.handleError));
  }

  deleteGroup(accessToken: string, groupName: string) {
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json;'
      }
    };

    return this.httpClient
      .delete(`${this.apiURL}${this.moduleURL}/deletegroup/${groupName}`, headers)
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error:${error.error.message}`;
    } else {
      errorMessage = `Error Code:${error.status}\nMessage: ${error.message}`;
    }
    this.router.navigate(['/']);
    return throwError(errorMessage);
  }
}
