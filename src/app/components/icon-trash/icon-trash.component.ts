import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icon-trash',
  templateUrl: './icon-trash.component.html',
  styleUrls: ['./icon-trash.component.scss']
})
export class IconTrashComponent implements OnInit {

  message1: string = "Deleting note..."

  message2: string = "Restoring"
  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  deleteForever() {
    this.messageEvent.emit(this.message1);
  }

  restore() {
    this.messageEvent.emit(this.message2);
  }

}
