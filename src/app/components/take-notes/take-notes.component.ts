import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl} from '@angular/forms';
import { Note } from "../../models/note.model";
import { UserServicesService } from "../../services/user-services.service";
import { MatDialog } from '@angular/material';
import { CollaboratorComponent } from "../collaborator/collaborator.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-take-notes',
  templateUrl: './take-notes.component.html',
  styleUrls: ['./take-notes.component.scss']
})
export class TakeNotesComponent implements OnInit {

  show: boolean = false;
  hide: boolean = true;
  isActive: boolean = true;
  
  title = new FormControl('');
  note = new FormControl('');
  noteModel: Note = new Note();
  options: any;
  message : string;
  color : any = "#ffffff";
  remind: any = '';
  collab: any = [];
  dialogRef: any;

  constructor(private noteService: UserServicesService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
  }

  Toggle() {
    this.show = !this.show;
    this.hide = !this.hide;
  }

  colorChange($event) {
    this.color = $event;
  }

  saveReminder($event) {
    this.remind = $event._validSelected
  }

  close() {
    if(this.title.value == '' && this.note.value == '') {
      this.show = !this.show;
      this.hide = !this.hide;
      this.color = "#ffffff";
      return;
    }
    this.noteModel = {
      title: this.title.value,
      description: this.note.value,
      color: this.color,
      reminder: this.remind
    }

    console.log(this.noteModel);
    this.options={
      data: this.noteModel,
      purpose: 'notes/addNotes'
    }
    this.noteService.noteServices(this.options).subscribe((Object) =>{
      console.log(Object);
      this.noteService.changeMessage('note saved');
    
    }, (error) => {
      console.log(error);
    });
    this.title.setValue('');
    this.note.setValue('');
    this.show = !this.show;
    this.hide = !this.hide;
    this.color = "#ffffff";
  }

  removeReminder() {
    this.remind = '';
  }

  openCollabDialog($event) {
    if ($event == "Collab...") {
      this.dialogRef = this.dialog.open(CollaboratorComponent, {
        width: 'auto',
        height: 'auto',
        data: {
          // noteIdList: id
        },
        panelClass: 'custom-modalbox'
      });
      this.dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

}