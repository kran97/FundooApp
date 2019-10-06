import { Component, OnInit } from '@angular/core';
import { FormControl,Validators} from '@angular/forms';
import { Note } from "../../models/note.model";
import { NoteServiceService } from "../../services/notes-services/note-service.service";

@Component({
  selector: 'app-take-notes',
  templateUrl: './take-notes.component.html',
  styleUrls: ['./take-notes.component.scss']
})
export class TakeNotesComponent implements OnInit {

  show: boolean = false;
  hide: boolean = true;
  isActive: any = true;

  message : string;
  
  title = new FormControl();
  note = new FormControl();
  noteModel: Note;
  options: any;

  constructor(private noteService: NoteServiceService) { }

  ngOnInit() {
  }

  Toggle() {
    this.show = !this.show;
    this.hide = !this.hide;
  }

  close() {
    this.show = !this.show;
    this.hide = !this.hide;
    this.noteModel = {
      title: this.title.value,
      notes: this.note.value
    }

    console.log(this.note);
    this.options={
      data: this.note,
      purpose: 'notes/addNotes'
    }
    this.noteService.noteServices(this.options).subscribe((response) =>{
      console.log(response);
    }, (error) => {
      console.log("error");
    });
  }

}
