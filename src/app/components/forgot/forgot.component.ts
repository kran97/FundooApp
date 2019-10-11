import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserServicesService } from "../../services/user-services.service";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  isValid = false;

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
    this.email.hasError('email') ? 'Not a valid email' : ''
  }

  constructor(private userService: UserServicesService, private router: Router) { }

  ngOnInit() {
  }

  sendMail() {
    var user = {
      "email" : this.email.value
    }
    let options = {
      data : user,
      purpose: 'user/reset'
    }
    console.log(options);
    this.userService.forgotService(options.purpose, options.data).subscribe((response:any)=>{
      console.log(response);
      this.isValid = true;
      this.router.navigate(['/reset']);
    }, (error)=>{
      console.log(error);
    });
  }

}
