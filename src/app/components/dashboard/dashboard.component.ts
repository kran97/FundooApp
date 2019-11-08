import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogComponent } from "../dialog/dialog.component";
import { UserServicesService } from "../../services/user-services.service";
import { ImageDialogComponent } from "../image-dialog/image-dialog.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  labels: string;
  value: any;
  searchText: string;
  email = localStorage.getItem('email');   
  firstName = localStorage.getItem('firstName');
  lastName = localStorage.getItem('lastName');
  backUrl: any;
  url: any;
  listView : boolean = false;

  constructor(private router: Router, public dialog: MatDialog, private noteLabelService: UserServicesService) {  }

  ngOnInit() {
    this.getLabels();
    this.noteLabelService.currentMessage.subscribe((res)=>{
      this.changeimage();
    })
  }

  gotoDashboard() {
    this.router.navigate([''])
  }
  gotoNotes() {
    this.router.navigate([''])
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
  gotoLabel(label) {
    this.router.navigate(['label/'+label])
    this.noteLabelService.changeMessage(label);
  }
  gotoCart() {
    this.router.navigate(['shoppingCart']);
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
      this.noteLabelService.changeMessage("no searching");
    }
    else
      this.noteLabelService.changeMessage(this.searchText);
  }

  openImageDialog() {
    const imgDialogRef = this.dialog.open(ImageDialogComponent, {width: '800px',height: '550px'});

    imgDialogRef.afterClosed().subscribe((res)=>{
      console.log('Image saved', res);
    })
  }

  changeimage(){
    this.backUrl = localStorage.getItem('imageUrl');
    this.url = 'http://fundoonotes.incubation.bridgelabz.com/' + this.backUrl;
  }
  changeView() {
    this.listView = !this.listView;
    this.noteLabelService.changeBool(this.listView);
  }

}