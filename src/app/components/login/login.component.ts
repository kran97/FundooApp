import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { UserLogin } from "../../models/login.model";
import { UserServicesService } from "../../services/user-services.service";
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

  userObj: any = new UserLogin();

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
    this.email.hasError('email') ? 'Not a valid email' : ''
  }
  getErrorPassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
    this.password.hasError('minlength') ? 'Minimum length should be 8 characters' : ''
  }

  constructor(private userService: UserServicesService, private router: Router) { }

  ngOnInit() {
  }

  OnLogin() {
    this.userObj = {
      email : this.email.value,
      password : this.password.value
    }
    let options = {
      data : this.userObj,
      purpose: 'user/login'
    }
    this.userService.loginService(options.purpose , options.data).subscribe((data:any)=> {
      if(data.id!=undefined){
        console.log(data);
        localStorage.setItem("token", data.id)
        localStorage.setItem('firstName', data.firstName)
        localStorage.setItem('lastName', data.lastName)
        localStorage.setItem("email", data.email)
        this.router.navigate([''])
      }
    })
  }

}
