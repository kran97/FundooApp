import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)])
  router: Router;

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
    this.email.hasError('email') ? 'Not a valid email' : ''
  }
  getErrorPassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
    this.password.hasError('minlength') ? 'Minimum length should be 8 characters' : ''
  }

  gotoRegister() {
    this.router.navigate(['register'])
  }

  constructor() { }

  ngOnInit() {
  }

}
