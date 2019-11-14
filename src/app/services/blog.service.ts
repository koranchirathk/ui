import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  apiURL: string = environment.baseUrl;
  moduleURL = 'bog';
  constructor(private router: Router, private httpClient: HttpClient) { }

  getAllBlogs(accessToken: string) {
    const headers = {
      headers: {
        Authorization: `Basic ${accessToken}`,
        'Content-Type': 'application/json;'
      }
    };

    return this.httpClient
      .get(`${this.apiURL}${this.moduleURL}/getallblogs`, headers)
      .pipe(catchError(this.handleError));
  }

  updateTheBlog(accessToken: string, blogDetails: any) {
    const headers = {
      headers: {
        Authorization: `Basic ${accessToken}`,
        'Content-Type': 'application/json;'
      }
    };

    return this.httpClient
      .put(`${this.apiURL}${this.moduleURL}/updateblog`, blogDetails, headers)
      .pipe(catchError(this.handleError));
  }

  addBlog(accessToken: string, blogDetails: any) {
    const headers = {
      headers: {
        Authorization: `Basic ${accessToken}`,
        'Content-Type': 'application/json;'
      }
    };

    return this.httpClient
      .post(`${this.apiURL}${this.moduleURL}/addblog`, blogDetails, headers)
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
    return throwError(errorMessage);
  }
}
