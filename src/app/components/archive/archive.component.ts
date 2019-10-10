import { Component, OnInit } from '@angular/core';
import { UserServicesService } from "../../services/user-services.service";
import { Note } from "../../models/note.model";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  records: any;
  note: Note;
  message: any;

  constructor(private noteService: UserServicesService) { }

  ngOnInit() {
    this.receiveNotes();
  }

  receiveNotes() {
    let options = {
      purpose: 'notes/getArchiveNotesList'
    }
    return this.noteService.getNoteServices(options).subscribe((response: any) => {
      this.records = response.data.data.reverse().filter(function (archived) {
        return (archived.isArchived == true && archived.isDeleted == false);
      });
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  deleteNote($event, id:any) {
    if ($event == "Deleting note...") {
      let noteData = {
        "noteIdList": [id],
        "isDeleted": true
      }
      console.log(noteData);
      let options = {
        data: noteData,
        purpose: 'notes/trashNotes'
      }
      this.noteService.noteTrashService(options).subscribe((Object) => {
        console.log(Object);
        this.receiveNotes();
      }, (error) => {
        console.log(error);
      });
    }
  }

  changeColor($event, id: any) {
    let noteData = {
      "noteIdList": [id],
      "color": $event
    }
    console.log(noteData);
      let options = {
        data: noteData,
        purpose: 'notes/changesColorNotes'
      }
      this.noteService.noteTrashService(options).subscribe((Object) => {
        console.log(Object);
        this.receiveNotes();
      }, (error) => {
        console.log(error);
      });
  }

}
