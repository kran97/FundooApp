import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})
export class IconListComponent implements OnInit {

  message: string = "Saving.."
  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
