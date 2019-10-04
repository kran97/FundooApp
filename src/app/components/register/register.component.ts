import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserServicesService } from "../../services/user-services.service";
import { User } from "./register.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  confirmpassword = new FormControl('', [Validators.required, Validators.pattern(this.password.value)]);

  userObj: any = new User();

  getErrorFirstName() {
    return this.firstName.hasError('required') ? 'You must enter your first name' : ''
  }
  getErrorLastName() {
    return this.lastName.hasError('required') ? 'You must enter your last name' : ''
  }
  getErrorEmail() {
    return this.email.hasError('required') ? 'You must enter an email' :
    this.email.hasError('email') ? 'Not a valid email' : ''
  }
  getErrorPassword() {
    return this.password.hasError('required') ? 'You must enter a password' :
    this.password.hasError('minlength') ? 'Minimum length should be 8 characters' : ''
  }
  getErrorConfirmPassword() {
    return this.password.hasError('required') ? 'You must enter a password' :
    this.confirmpassword.hasError('pattern') ? 'Confirm password should match above password' : ''
  }

  constructor(private userService: UserServicesService, private router: Router) { 
    this.userService.print("Inside Register Constructor..");
   }

  ngOnInit() {
  }

  OnRegister() {
    this.userObj = {
      firstName : this.firstName.value,
      lastName : this.lastName.value,
      email : this.email.value,
      password : this.password.value,
      service : "basic"
    }
    let options = {
      data : this.userObj,
      purpose: 'user/userSignUp'
    }
    this.userService.registerService(options.purpose , options.data).subscribe((data:any)=> {
      if(data != undefined){
        console.log(data.data);
        if(data.data.success){
          console.log("Registration status "+ data.data.success);
          this.router.navigate(['']);
        }
      }
    })
  }
  
}
