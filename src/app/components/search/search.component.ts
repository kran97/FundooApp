import { Component, OnInit } from '@angular/core';
import { UserServicesService } from "../../services/user-services.service";
import { MatDialog } from '@angular/material';
import { EditDialogComponent } from "../edit-dialog/edit-dialog.component";
import { SearchPipePipe } from "../../pipes/search-pipe.pipe";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchText:string;
  searchPipe: SearchPipePipe = new SearchPipePipe();
  records: any;
  filteredRecords: any;
  updateMsg: any;
  dialogRef: any;
  color: any;

  constructor(private noteService: UserServicesService, public dialog: MatDialog) { }

  ngOnInit() {
    this.searchNotes();
  }

  filterDel(records) {
    var newRecords = records.filter(function(e) {
      return e.isDeleted == false;
    });
    return newRecords;
  }

  searchNotes() {
    this.noteService.currentMessage.subscribe((searchText)=> {
      this.searchText = searchText;
    });
    let options = {
      purpose: 'notes/getNotesList'
    }
    this.noteService.getNoteServices(options).subscribe((response: any)=>{
      this.records = response.data.data.reverse();
      this.records = this.filterDel(this.records);
      this.filteredRecords = this.searchPipe.transform(this.records, this.searchText);
      console.log(this.filteredRecords);
    }, (error) =>{
      console.log(error);
    })
  }

  // receiveUpdate($event) {
  //   this.updateMsg = $event;
  //   this.searchNotes();
  // }

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
        this.searchNotes();
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
        this.searchNotes();
        // this.noteService.changeMessage('note trashed');
      }, (error) => {
        console.log(error);
      });
    }
  }

  changeColor($event, id: any) {
    if ($event != "Archive..." && $event != "Deleting note...") {
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
        this.searchNotes();
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
      this.searchNotes();
    });
  }

}
