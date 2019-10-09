import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl} from '@angular/forms';
import { Note } from "../../models/note.model";
import { UserServicesService } from "../../services/user-services.service";

@Component({
  selector: 'app-take-notes',
  templateUrl: './take-notes.component.html',
  styleUrls: ['./take-notes.component.scss']
})
export class TakeNotesComponent implements OnInit {

  show: boolean = false;
  hide: boolean = true;
  isActive: any = true;
  
  title = new FormControl('');
  note = new FormControl('');
  noteModel: Note = new Note();
  options: any;
  message : string;

  constructor(private noteService: UserServicesService) { }

  ngOnInit() {
  }

  Toggle() {
    this.show = !this.show;
    this.hide = !this.hide;
  }

  close() {
    this.noteModel = {
      title: this.title.value,
      description: this.note.value
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
    this.show = !this.show;
    this.hide = !this.hide;
  }

}