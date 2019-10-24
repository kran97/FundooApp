import { Component, OnInit, Inject } from '@angular/core';
import { UserServicesService } from "../../services/user-services.service";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  backUrl: any;
  url: any;
  firstName: string = localStorage.getItem('firstName');
  lastName: string = localStorage.getItem('lastName');
  email: string = localStorage.getItem('email');
  searchResultList :any=[];
  collabDetails : any = [];
  noteId : any;
  records: any;
  collabUrl: any;

  constructor(private noteService : UserServicesService, public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit() {
    this.changeimage();
    this.getCollab();
  }

  changeimage(){
    this.backUrl = localStorage.getItem('imageUrl');
    this.url = 'http://fundoonotes.incubation.bridgelabz.com/' + this.backUrl;
  }

  searchlist(data) {
    if (data != '') {
      let options = "/user/searchUserList"
      this.noteService.searchUserList(
        { "searchWord": data }, options).subscribe(data => {
          console.log(data)
          this.searchResultList = data['data']['details'];
        })
    }
  }

  getCollab() {
    let collabData = {
      id : this.dialogData.noteIdList
    }
    let options = {
      data: collabData,
      purpose: "notes/"+this.dialogData.noteIdList
    }
    this.noteService.getPatch(options).subscribe(data => {
      console.log(data);
      this.collabDetails = data['collaborators'];
      console.log(this.collabDetails)
    }, (error)=> {
      console.log(error);
    })
  }

  saveCollab(email, firstName, lastName, userId) {
    this.noteId = this.dialogData.noteIdList;
    let collabData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      userId: userId
    }
    let options = {
      data: collabData,
      purpose: "notes/"+this.noteId+"/AddcollaboratorsNotes"
    };
    this.noteService.noteTrashService(options).subscribe((Object) => {
      console.log(Object);
      this.getCollab();
    }, (error) => {
      console.log(error);
    });
  }

  removeCollab(userId) {
    this.noteId = this.dialogData.noteIdList;
    let options = {
      purpose: "notes/"+this.noteId+"/removeCollaboratorsNotes/"+userId
    };
    this.noteService.deleteWithTokenJson(options).subscribe((Object) => {
      console.log(Object);
      this.getCollab();
    }, (error) => {
      console.log(error);
    });
  }

}
