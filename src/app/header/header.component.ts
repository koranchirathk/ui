import { Component, OnInit } from "@angular/core";
import { StorageService } from "../services/storage-service";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication-service.service";
import { User } from "../model/user";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  public userData: User;
  public userName: string;
  constructor(
    private storage: StorageService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.userData = this.storage.getUserDetails();
    if (this.userData && this.userData.username) {
      this.userName = this.userData.username;
    } else {
      this.router.navigate(["/"]);
    }
  }

  // Redirect to home
  goToHome() {
    this.router.navigate(["home"]);
  }

  // On log out
  logout() {
    this.authenticationService.logout();
  }
}
