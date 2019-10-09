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
  
  ngOnInit() {
    this.router.navigate(['notes']);
  }

  gotoDashboard() {
    this.router.navigate([''])
  }
  gotoNotes() {
    this.router.navigate(['notes'])
  }
  gotoReminder() {
    this.router.navigate(['reminder'])
  }
  gotoArchive() {
    this.router.navigate(['archive'])
  }
  gotoTrash() {
    this.router.navigate(['trash'])
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