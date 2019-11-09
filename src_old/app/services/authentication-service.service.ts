import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUserDetails: any = {};
  constructor(private router: Router) { }

  login(username: string, password: string) {
    // need to call service to get user validation
    if (username && password) {
      return this.currentUserDetails;
    }
  }

  logout() {
    this.currentUserDetails = {};
    sessionStorage.setItem('UserDetails', null);
    this.router.navigate(['/']);
  }
}
