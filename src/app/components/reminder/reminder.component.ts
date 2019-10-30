import { Component, OnInit } from '@angular/core';
import { UserServicesService } from "../../services/user-services.service";
import { MatDialog } from '@angular/material';
import { EditDialogComponent } from "../edit-dialog/edit-dialog.component";
import { CollaboratorComponent } from "../collaborator/collaborator.component";

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  records: any;
  message: any;
  title: string;
  description: string;
  dialogRef: any;
  color: any;
  label: any;
  listView: any = false;

  constructor(private noteService: UserServicesService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getNoteData();
    this.noteService.currentMessage.subscribe((res: any) => {
      this.getNoteData();
    });
    this.noteService.boolMessage.subscribe((res: any)=>{
      this.listView = res;
      this.getNoteData();
      console.log(this.listView);
    });
  }

  getNoteData() {

    let options = {
      purpose: 'notes/getReminderNotesList'
    }

    this.noteService.reminderdisplaynoteservice(options).subscribe((response: any) => {
      this.records = response.data.data;
      this.records.reverse();
      console.log("hit api...",response);
      // console.log("data list.....",this.remindComp);
      
      
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
        this.getNoteData();
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
        this.getNoteData();
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
        this.getNoteData();
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
      this.getNoteData();
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
      this.getNoteData();
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
      this.getNoteData();
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
        this.getNoteData();
      });
    }
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

}
