import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { FormControl } from "@angular/forms";
import { UserServicesService } from "../../services/user-services.service";
import { DataServiceService } from "../../services/data-service.service";
import { Note } from "../../models/note.model";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  options: any;
  noteObj: any = new Note();
  noteObj1: any;
  labelValue: any = new FormControl('');
  labels: any;
  labelMessage = ' label added';
  delLabelMessage = 'label deleted';

  @Output() noteMessageEvent = new EventEmitter<string>();

  constructor(public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData,
    private noteLabelService: UserServicesService, private dataService: DataServiceService) { }

  ngOnInit() {
    this.getNoteLabels();
  }

  getNoteLabels() {

    const options = {
      purpose: 'noteLabels/getNoteLabelList'
    };
    this.noteLabelService.getLabelService(options).subscribe((response: any) => {
      this.labels = response.data.details.reverse();
      console.log(response.data.details);
    }, (error) => {
      console.log(error.statusText);
    });
  }

  onCreateLabel() {

    this.noteObj1 = {
      label: this.labelValue.value,
      isDeleted: false,
      userId: localStorage.getItem('userId')
    };

    this.options = {
      data: this.noteObj1,
      purpose: 'noteLabels'
    };

    this.noteLabelService.postWithTokenNotEncoded(this.options).subscribe((response) => {
      console.log(response);
      this.getNoteLabels();
      this.noteLabelService.changeMessage(this.labelMessage);
    }, (error) => {
      console.log(error);
    });
  }
  onDone() {
    this.dialogRef.close('Closed');
  }

  onDelete(label) {
    var id = label.id

    const options = {
      purpose: 'noteLabels/'+id+'/deleteNoteLabel'
    };
    return this.noteLabelService.deleteWithToken(options).subscribe((response: any) => {
      console.log(response);
      this.getNoteLabels();
      this.noteLabelService.changeMessage(this.delLabelMessage);
    }, (error) => {
      console.log(error);
    });
  }

}
