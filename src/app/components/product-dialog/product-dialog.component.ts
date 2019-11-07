import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from "@angular/router";

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }

    serv: any = this.data;

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  checkout() {
    this.router.navigate(['/signup']);
    this.dialogRef.close();
  }

}
