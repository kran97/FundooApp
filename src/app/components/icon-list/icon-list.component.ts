import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export interface Tile {
  color: string;
}

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})
export class IconListComponent implements OnInit {

  tiles: Tile[] = [
    {color: 'lightblue'},
    {color: 'lightgreen'},
    {color: 'lightpink'},
    {color: '#DDBDF1'},
  ];

  message: string = "Saving.."
  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
