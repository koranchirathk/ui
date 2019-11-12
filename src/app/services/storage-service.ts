import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // store user details
  setUserDetails(userDetails: User) {
    sessionStorage.setItem('UserDetails', JSON.stringify(userDetails));
  }

  getUserDetails() {
    const userDetails = sessionStorage.getItem('UserDetails');
    return 'tests';
    //return userDetails ? JSON.parse(userDetails) : '';
  }
}
