import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  hide = true;
  password = new FormControl('', [Validators.required, Validators.minLength(8)])
  router: Router;

  getErrorPassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
    this.password.hasError('minlength') ? 'Minimum length should be 8 characters' : ''
  }

  constructor() { }

  ngOnInit() {
  }

}
