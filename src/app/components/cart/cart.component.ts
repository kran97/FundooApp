import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserServicesService } from "../../services/user-services.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  service = [];
  isLinear: boolean = true;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private userService: UserServicesService) { }

  ngOnInit() {
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.getCartDetails();
  }

  getCartDetails() {
    let options = {
      purpose: "productcarts/myCart"
    }
    this.userService.getCartDetails(options).subscribe((result)=> {
      this.service = result['data'];
      console.log(result['data']);
    }, (error)=> {
      console.log(error);
    })
  }

}
