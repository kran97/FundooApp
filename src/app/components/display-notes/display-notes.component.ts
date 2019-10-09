import { Component, OnInit, Inject } from '@angular/core';
import { UserServicesService } from "../../services/user-services.service";
import { Note } from "../../models/note.model";

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

  records: any;
  note: Note;
  message : any;

  constructor(private noteService: UserServicesService) { }

  ngOnInit() {
    this.receiveNotes();
    this.noteService.currentMessage.subscribe((res) => {
      this.receiveNotes();
    });
  }

  receiveNotes() {
    let options = {
      purpose: 'notes/getNotesList'
    }
    return this.noteService.getNoteServices(options).subscribe((response: any) => {
      // this.records = response.data.data.reverse();
      this.records = response.data.data.reverse().filter(function(notDeleted){
        return notDeleted.isDeleted==false;
      });
     
        console.log(response);
     }, (error)=>{
        console.log(error);
      });
      
  }

  deleteNote($event, id: any) {
    this.message = $event;
    let noteData = {
      "noteIdList": [id],
      "isDeleted": true
    }

    console.log(noteData);
    let options={
      data: noteData,
      purpose: 'notes/trashNotes'
    }
    this.noteService.noteTrashService(options).subscribe((Object) =>{
      console.log(Object);
      // this.noteService.changeMessage('note trashed');
    }, (error) => {
      console.log(error);
    });
  }
  
}