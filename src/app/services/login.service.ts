import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiURL: string = environment.baseUrl;
  moduleURL = 'users';
  currentUserDetails: any = {};
  constructor(private router: Router, private httpClient: HttpClient) { }

  getUserDetail(username: string, accessTken: string) {
    const headers = {
      headers: {
        username: username,
        Authorization: `Bearer ${accessTken}`,
        'Content-Type': 'application/json'
      }
    };
    return this.httpClient
      .get(`${this.apiURL}${this.moduleURL}/getuserdetail`, headers)
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
    alert('Enter proper credentials.');
    return throwError(errorMessage);
  }
}
