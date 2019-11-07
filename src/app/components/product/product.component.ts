import { Component, OnInit } from '@angular/core';
import { ProductDialogComponent } from "../product-dialog/product-dialog.component";
import { MatDialog } from '@angular/material';
import { UserServicesService } from "../../services/user-services.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  dialogRef: any;
  serviceArr : any = [];

  constructor(private noteService: UserServicesService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getServiceDetail();
  }

  getServiceDetail() {
    let url = 'user/service'
    this.noteService.getService(url).subscribe((result)=> {
      this.serviceArr = result['data'].data;
      console.log(this.serviceArr);
    })
  }

  openDialog(serv) {
    this.dialogRef = this.dialog.open(ProductDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: serv,
      panelClass: 'custom-modalbox'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  cartAdd(cart){
    this.noteService.addToCart({
      "productId":cart.id
    }).subscribe(data=>{
      localStorage.setItem("cartId", data['data']['details'].id)
    })
  }

}
