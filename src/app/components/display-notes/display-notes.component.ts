import { Component, OnInit } from '@angular/core';
import { UserServicesService } from "../../services/user-services.service";
import { Note } from "../../models/note.model";
import { MatDialog } from '@angular/material';
import { EditDialogComponent } from "../edit-dialog/edit-dialog.component";
import { CollaboratorComponent } from "../collaborator/collaborator.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})

export class DisplayNotesComponent implements OnInit {

  records: any;
  note: Note;
  message: any;
  title: string;
  description: string;
  dialogRef: any;
  color: any;
  label: any;
  listView: any = false;
  remind: any;

  constructor(private noteService: UserServicesService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.receiveNotes();
    this.noteService.currentMessage.subscribe((res) => {
      this.receiveNotes();
    });
    this.noteService.boolMessage.subscribe((res: any)=>{
      this.listView = res;
      this.receiveNotes();
      console.log(this.listView);
    });
  }

  receiveNotes() {
    let options = {
      purpose: 'notes/getNotesList'
    }
    return this.noteService.getNoteServices(options).subscribe((response: any) => {
      this.records = response.data.data.reverse().filter(function (notDeleted) {
        return (notDeleted.isDeleted == false && notDeleted.isArchived == false);
      });
      console.log(this.records);
    }, (error) => {
      console.log(error);
    });

  }

  deleteNote($event, id: any) {
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
        // this.noteService.changeMessage('note trashed');
      }, (error) => {
        console.log(error);
      });
    }
  }

  archiveNote($event, id: any) {
    if ($event == "Archive...") {
      let noteData = {
        "noteIdList": [id],
        "isArchived": true
      }

      console.log(noteData);
      let options = {
        data: noteData,
        purpose: 'notes/archiveNotes'
      }
      this.noteService.noteTrashService(options).subscribe((Object) => {
        console.log(Object);
        this.receiveNotes();
        // this.noteService.changeMessage('note trashed');
      }, (error) => {
        console.log(error);
      });
    }
  }

  changeColor($event, id: any) {
    if ($event != "Archive..." && $event != "Deleting note..." && $event != "Collab...") {
      this.color = $event;
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

  editDialog(title, description, color, id) {
    this.dialogRef = this.dialog.open(EditDialogComponent, {
      width: '450px',
      data: {
        noteIdList: id,
        title: title,
        description: description,
        color: color
      },
      panelClass: 'custom-modalbox'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.receiveNotes();
    });
  }

  saveLabel($event, id) {
    this.label = $event;
    let noteData = {
      "noteId": id,
      "labelId": this.label
    };
    console.log(noteData);
    let options = {
      data: noteData,
      purpose: 'notes/' + id + '/addLabelToNotes/' + this.label + '/add'
    };
    this.noteService.noteTrashService(options).subscribe((Object) => {
      console.log(Object);
      this.receiveNotes();
    }, (error) => {
      console.log(error);
    });
  }

  removeLabel(labelId, noteId) {
    let noteData = {
      "noteId": noteId,
      "labelId": labelId
    };
    console.log(noteData);
    let options = {
      data: noteData,
      purpose: 'notes/' + noteId + '/addLabelToNotes/' + labelId + '/remove'
    };
    this.noteService.noteTrashService(options).subscribe((Object) => {
      console.log(Object);
      this.receiveNotes();
    }, (error) => {
      console.log(error);
    });
  }

  openCollabDialog($event, id: any) {
    if ($event == "Collab...") {
      this.dialogRef = this.dialog.open(CollaboratorComponent, {
        width: '625px',
        height: '325px',
        data: {
          noteIdList: id
        },
        panelClass: 'custom-modalbox'
      });
      this.dialogRef.afterClosed().subscribe(result => {
        this.receiveNotes();
      });
    }
  }

  saveReminder($event, id){
    let remind = {
      reminder: $event._validSelected,
      noteIdList: [id],
    }
    let options = {
      data: remind,
      purpose: "notes/addUpdateReminderNotes"
    }
    
    this.noteService.remindernoteservice(options).subscribe((response:any) => {
      console.log("succcessss.....",response);
      
      this.noteService.changeMessage("Hello from Sibling")
    });
  }

  removeReminder(id) {
    let content = {
      "noteIdList" : [id]
    }
    let options = {
      data: content,
      purpose: "notes/removeReminderNotes"
    }
    this.noteService.reminderDeleteService(options).subscribe((response)=> {
      console.log("delete successful... ",response);
      this.noteService.changeMessage("Delete Done")
    })
  }

  gotoQuestion($event, id) {
    if($event == "Question...") {
      this.noteService.changeMessage(id);
      this.router.navigate(['QuestionAnswer/'+id])
    }
  }

}