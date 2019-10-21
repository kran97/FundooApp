import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserServicesService } from "../../services/user-services.service";

export interface Tile {
  color: string;
}

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})
export class IconListComponent implements OnInit {

  colorArray =
    [[
      { 'color': '#B39DDB', 'name': 'purple' },
      { 'color': '#F48FB1', 'name': 'pink' },
      { 'color': '#FFAB40', 'name': 'brown' },
      { 'color': '#E0E0E0', 'name': 'gray' }
    ],
    [
      { 'color': '#FFFFFF', 'name': 'White' },
      { 'color': '#E53935', 'name': 'Red' },
      { 'color': '#EF6C00', 'name': 'Orange' },
      { 'color': '#FFEB3B', 'name': 'Yellow' }],
    [
      { 'color': '#B2FF59', 'name': 'green' },
      { 'color': '#69F0AE', 'name': 'teal' },
      { 'color': '#81D4FA', 'name': 'blue' },
      { 'color': '#0288D1', 'name': 'darkblue' }
    ]]

    labels: any;
    label: any;
    labelId: any;

  messageDelete: string = "Deleting note..."
  messageArchive: string = "Archive..."
  @Output() messageEvent = new EventEmitter<string>();
  @Output() labelEvent = new EventEmitter<string>();

  constructor(private noteLabelService: UserServicesService) { }

  ngOnInit() {
    this.getLabels();
  }

  changeColor(color :any) {
    this.messageEvent.emit(color);
  }

  deleteNote() {
    this.messageEvent.emit(this.messageDelete);
  }

  archiveNote() {
    this.messageEvent.emit(this.messageArchive);
  }

  labelNote(label:any) {
    this.label = label;
    this.labelEvent.emit(this.label);
    console.log("LabelID.. ", label)
  }

  getLabels() {

    const options = {
      purpose: 'noteLabels/getNoteLabelList',
    };
    this.noteLabelService.getWithToken(options).subscribe((response: any) => {
      this.labels = response.data.details;
      this.labelId = response.data.details;
    }, (error) => {
      console.log(error.statusText);
    });
  }

}
