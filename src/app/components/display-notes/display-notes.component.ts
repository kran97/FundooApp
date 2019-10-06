import { Component, OnInit, Inject } from '@angular/core';
import { NoteServiceService } from "../../services/notes-services/note-service.service";
import {MatDialog, MatDialogConfig} from "@angular/material";
import { Note } from "../../models/note.model";
@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

  records: any;
  note: Note;

  constructor(private noteService: NoteServiceService, public dialog: MatDialog) { }

  ngOnInit() {
  }

}
