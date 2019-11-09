import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage-service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userName: string;
  constructor(
    private storage: StorageService,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    const user = this.storage.getUserDetails();
    if (user && user.firstName) {
      this.userName = user.firstName;
    } else {
      this.router.navigate(['/']);
    }
  }

  // Redirect to home
  goToHome() {
    this.router.navigate(['home']);
  }

  // On log out
  logout() {
    this.authenticationService.logout();
  }

}
