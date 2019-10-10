import { Component, OnInit, Inject } from '@angular/core';
import { UserServicesService } from "../../services/user-services.service";
import { Note } from "../../models/note.model";

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  records: any;
  note: Note;
  message: any;

  constructor(private noteService: UserServicesService) { }

  ngOnInit() {
    this.receiveNotes();
  }

  receiveNotes() {
    let options = {
      purpose: 'notes/getTrashNotesList'
    }
    return this.noteService.getNoteServices(options).subscribe((response: any) => {
      this.records = response.data.data.reverse().filter(function (Deleted) {
        return Deleted.isDeleted == true;
      });
      console.log(response);
    }, (error) => {
      console.log(error);
    });

  }

  deleteForever($event, id: any) {

    if ($event == "Deleting note...") {
      // this.message = $event;
      let noteData = {
        "noteIdList": [id],
        "isDeleted": true
      }
      console.log(noteData);
      let options = {
        data: noteData,
        purpose: 'notes/deleteForeverNotes'
      }
      this.noteService.noteTrashService(options).subscribe((Object) => {
        console.log(Object);
        this.receiveNotes();
      }, (error) => {
        console.log(error);
      });
    }
  }

  deleteAll() {
    let options = {
      purpose: 'notes/getTrashNotesList'
    }
    return this.noteService.getNoteServices(options).subscribe((response: any) => {
      this.records = response.data.data.reverse().filter(function (Deleted) {
        return Deleted.isDeleted == true;
      });
      console.log("idsss ", this.records[0].id);
      console.log(response);
    }, (error) => {
      console.log(error);
    });


  }

  restore($event, id: any) {
    this.message = $event;
    if ($event == "Restoring") {
      let noteData = {
        "noteIdList": [id],
        "isDeleted": false
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

}
