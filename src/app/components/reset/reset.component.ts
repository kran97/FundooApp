import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UserServicesService } from "../../services/user-services.service";
import { Reset } from "../../models/reset.model";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  hide = true;
  password = new FormControl('', [Validators.required, Validators.minLength(8)])
  userObj: Reset = new Reset();

  getErrorPassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
    this.password.hasError('minlength') ? 'Minimum length should be 8 characters' : ''
  }

  constructor(private userService: UserServicesService, private router: Router, private activated: ActivatedRoute) { }

  accessToken = this.activated.snapshot.paramMap.get('token');

  ngOnInit() {
    localStorage.setItem('token', this.accessToken);
  }

  OnReset(){
    var userObj1 = {
      newPassword : this.password.value
    }
    let options = {
      data : userObj1,
      purpose: 'user/reset-password'
    }
    console.log("resetComponent")
    this.userService.resetService(options).subscribe((data:any)=> {
      console.log(data);
      localStorage.clear();
      this.router.navigate(['/login']);
    }, (error)=>{
      console.log("This is error");
      console.log(error);
    });
  }

}
