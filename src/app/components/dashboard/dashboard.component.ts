import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogComponent } from "../dialog/dialog.component";
import { UserServicesService } from "../../services/user-services.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  labels: string;
  value: any;
  searchText: string;

  constructor(private router: Router, public dialog: MatDialog, private noteLabelService: UserServicesService) { }

  ngOnInit() {
    this.getLabels();
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

  getLabels() {

    const options = {
      purpose: 'noteLabels/getNoteLabelList',
    };
    this.noteLabelService.getWithToken(options).subscribe((response: any) => {
      this.labels = response.data.details.reverse();
      console.log(response.data.details);
    }, (error) => {
      console.log(error.statusText);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log('Dialog output:', result);
        this.getLabels();
      }
    );
  }

  searchfor() {
    if (this.searchText == '') {
      this.noteLabelService.changeMessage("nosearching");
    }
    else
      this.noteLabelService.changeMessage(this.searchText);
  }

}