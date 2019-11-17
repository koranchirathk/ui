import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication-service.service";
import { StorageService } from "../services/storage-service";
import { User } from "../model/user";
import { LoginService } from "../services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private storage: StorageService,
    private userService: LoginService
  ) {
    // if user has logged in redirect to home page
    if (this.authenticationService.currentUserDetails) {
      this.router.navigate(["/"]);
    }
  }

  public loginForm: FormGroup;
  public submitted = false;
  public returnUrl: string;
  public userData: any = {};
  public sessionData: any = {};

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams[this.returnUrl] || "/";
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.loginForm.controls;
  }

  // on login
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      alert("Username/Password is/are not entered.");
      return;
    }
    this.authenticationService
      .login(this.form.username.value, this.form.password.value)
      .subscribe((data: any) => {
        this.sessionData = data;
        this.userService
          .getUserDetail(
            this.form.username.value,
            this.sessionData.access_token
          )
          .subscribe((userData: any) => {
            this.userData.id = userData.id;
            this.userData.name = userData.name;
            this.userData.username = userData.username;
            this.userData.roles = userData.roles;
            this.userData.access_token = this.sessionData.access_token;
            console.log(this.userData);
            this.storage.setUserDetails(this.userData);
            this.router.navigate(["/home"]);
          });
      });
  }
}
