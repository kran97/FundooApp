import { Component, OnInit, Inject } from '@angular/core';
import { UserServicesService } from "../../services/user-services.service";
import { Note } from "../../models/note.model";

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
