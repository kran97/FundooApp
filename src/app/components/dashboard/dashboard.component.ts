import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material';
import { DialogComponent } from "../dialog/dialog.component";

export interface DialogData {
  label: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  label: string;

  constructor(private router:Router, public dialog: MatDialog) { }
  name: string;

  ngOnInit() {
    this.name = localStorage.getItem('firstName');
  }

  gotoDashboard() {
    this.router.navigate(['dashboard'])
  }

  exitApp() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {label: this.label}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.label = result;
    });
  }

}

// @Component({
//   selector: 'dialog',
//   templateUrl: 'dialog.component.html',
// })
// export class Dialog {

//   constructor(
//     public dialogRef: MatDialogRef<Dialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
