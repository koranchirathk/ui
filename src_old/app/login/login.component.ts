import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service.service';
import { StorageService } from '../services/storage-service';
import { first } from 'rxjs/operators';
import { User } from '../model/user';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private storage: StorageService) {
    // if user has logged in redirect to home page
    if (this.authenticationService.currentUserDetails) {
      this.router.navigate(['/']);
    }
  }

  public loginForm: FormGroup;
  public submitted = false;
  public returnUrl: string;
  public userData: User;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams[this.returnUrl] || '/';
  }

  // convenience getter for easy access to form fields
  get form() { return this.loginForm.controls; }

  // on login
  onSubmit() {
    let userDetail = { 'userName': this.form.username.value, 'password': this.form.password.value }

    this.submitted = true;
    if (this.loginForm.invalid) {
      alert('Username/Password is/are not entered.');
      return;
    }
    console.log(this.form.username.value, this.form.password.value);
     const user = new User();
    this.loginService.verifyUser(userDetail).subscribe((data: any) =>{
     console.log(data+"data");
    });

    user.firstName = 'Test';
    user.lastName = 'User';
    user.userId = '123Test456';
    user.groups = [22, 33, 44];
    user.contacts = ['123Test_1456', '123Test_2456'];
    this.userData = user;
    this.storage.setUserDetails(this.userData);
    this.router.navigate(['/home']);

  }
}
