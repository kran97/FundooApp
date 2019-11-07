import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { UserServicesService } from "../../services/user-services.service";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})



export class EditDialogComponent implements OnInit {

  color: any;
  options: any;
  title = new FormControl('');
  note = new FormControl('');

  constructor(private noteService: UserServicesService, public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.color = this.data.color
  }

  colorChange($event) {
    this.color = $event;
  }

  close() {

    var noteModel = {
      noteId: this.data.noteIdList,
      title: this.title.value,
      description: this.note.value,
      color: this.color
    }

    if (this.title.value == "" && this.note.value != "") {
      noteModel.title = this.data.title
    }
    if (this.title.value != "" && this.note.value == "") {
      noteModel.description = this.data.description
    }
    if (this.title.value == "" && this.note.value == "") {
      noteModel.title = this.data.title,
      noteModel.description = this.data.description
    }

    console.log("noteModel wala data ", noteModel);
    this.options = {
      data: noteModel,
      purpose: 'notes/updateNotes'
    }
    this.noteService.noteServices(this.options).subscribe((Object) => {
      console.log(Object);
      this.noteService.changeMessage('note saved');
    }, (error) => {
      console.log(error);
    });

    this.dialogRef.close();
  }

}
