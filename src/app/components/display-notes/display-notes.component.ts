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

  constructor(private noteService: UserServicesService) { }

  ngOnInit() {
    let options = {
      purpose: 'notes/getNotesList'
    }
    return this.noteService.getNoteServices(options).subscribe((response: any) => {
      this.records = response.data.data.reverse();
        console.log(response);
     }, (error)=>{
        console.log(error);
      });
  }
  
}