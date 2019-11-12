import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiURL: string = environment.baseUrl;
  moduleURL = 'oauth';
  currentUserDetails: any = {};
  constructor(private router: Router, private httpClient: HttpClient) { }

  login(username: string, password: string) {
    const headers = {
      headers: {
        Authorization: `Basic ${btoa('rokin-client:secret')}`,
        'Content-Type': 'application/x-www-form-urlencoded;'
      }
    };

    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);

    return this.httpClient
      .post(`${this.apiURL}${this.moduleURL}/token`, body.toString(), headers)
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

  logout() {
    this.currentUserDetails = {};
    sessionStorage.setItem('UserDetails', null);
    this.router.navigate(['/']);
  }
}
