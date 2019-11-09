import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiURL: string = environment.baseUrl;
  moduleURL: string = 'users';
  currentUserDetails: any = {};
  constructor(private router: Router, private httpClient: HttpClient) { }

  login(username: string, password: string) {
    // need to call service to get user validation
    // if (username && password) {
    //   return this.currentUserDetails;
    // }

    return this.httpClient
      .post(this.apiURL + this.moduleURL + '/user', { username, password })
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error:${error.error.message}`;
    } else {
      errorMessage = `Error Code:${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  logout() {
    this.currentUserDetails = {};
    sessionStorage.setItem('UserDetails', null);
    this.router.navigate(['/']);
  }
}
