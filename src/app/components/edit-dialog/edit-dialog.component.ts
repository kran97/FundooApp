import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { UserServicesService } from "../../services/user-services.service";
import { CollaboratorComponent } from "../collaborator/collaborator.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})



export class EditDialogComponent implements OnInit {

  color: any;
  options: any;
  title = new FormControl('');
  note = new FormControl('');
  label: any;
  dialogRefCollab: any;
  list
  listItem
  listToggle: any;
  tempID

  constructor(public router: Router, public dialog: MatDialog, private noteService: UserServicesService, public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.color = this.data.color
    console.log(this.data);
  }

  colorChange($event) {
    this.color = $event;
  }

  close() {

    var noteModel = {
      noteId: this.data.noteIdList,
      title: this.title.value,
      description: this.note.value,
      color: this.color
    }

    if (this.title.value == "" && this.note.value != "") {
      noteModel.title = this.data.title
    }
    if (this.title.value != "" && this.note.value == "") {
      noteModel.description = this.data.description
    }
    if (this.title.value == "" && this.note.value == "") {
      noteModel.title = this.data.title,
      noteModel.description = this.data.description
    }

    console.log("noteModel wala data ", noteModel);
    this.options = {
      data: noteModel,
      purpose: 'notes/updateNotes'
    }
    this.noteService.noteServices(this.options).subscribe((Object) => {
      console.log(Object);
      this.noteService.changeMessage('note saved');
    }, (error) => {
      console.log(error);
    });

    this.dialogRef.close();
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
      // this.receiveNotes();
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
      // this.receiveNotes();
    }, (error) => {
      console.log(error);
    });
  }

  openCollabDialog($event, id: any) {
    if ($event == "Collab...") {
      this.dialogRefCollab = this.dialog.open(CollaboratorComponent, {
        width: 'auto',
        height: 'auto',
        data: {
          noteIdList: id
        },
        panelClass: 'custom-modalbox'
      });
      this.dialogRefCollab.afterClosed().subscribe(result => {
        // this.receiveNotes();
      });
    }
  }

  saveReminder($event, id){
    let remind = {
      reminder: $event._validSelected,
      noteIdList: [id],
    }
    let options = {
      data: remind,
      purpose: "notes/addUpdateReminderNotes"
    }
    
    this.noteService.remindernoteservice(options).subscribe((response:any) => {
      console.log("succcessss.....",response);
      
      this.noteService.changeMessage("Hello from Sibling")
    });
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

  gotoQuestion($event, id) {
    if($event == "Question...") {
      // let obj = {
      //   title : title,
      //   description: description
      // }
      // this.noteService.changeObj(obj);
      this.router.navigate(['QuestionAnswer/'+id])
    }
  }

  //checklist functions 
  removeCheckList(list, noteId){
    let options ={
      noteId : noteId,
      checklistId : list.id,
      checklistdata : list
    }
    console.log(options)
    list.status="close";
    this.noteService.updateCheckList(options).subscribe(data=>{
      console.log('data', data)
    }, 
    error=>{
      console.log("error", error)
    })
  }

  deleteCheckList(list, noteId){
    let options={
      noteId : noteId,
      checklistId : list.id,
      checklistdata:list
    }
    list.status=''
    this.noteService.deleteCheckList(options).subscribe(data=>{
      console.log('data',data)
    },error=>{
      console.log("error",error)
    })

  }

  updateList(list, noteId){
    let options ={
      noteId : noteId,
      checklistId : list.id,
      checklistdata : list
    }
    console.log(options)
    this.noteService.updateCheckList(options).subscribe(data=>{
      console.log('data', data)
    }, 
    error=>{
      console.log("error", error)
    })
  }

  addCheckList(list, noteId){
    let options ={
      noteId : noteId,
      checklistId : list.id,
      checklistdata : list
    }
    console.log(options)
    list.status="open";
    this.noteService.updateCheckList(options).subscribe(data=>{
      console.log('data', data)
    }, 
    error=>{
      console.log("error", error)
    })
  }

  addlist(noteId, checklist){
    console.log("noteid", noteId, "listItem", this.listItem)
  let data={
    itemName : this.listItem,
    status : "open"
  }
  this.noteService.addList({
    noteId, data
    }).subscribe(data=>{
      console.log('data',data)
      checklist.push(data['data'].details)
      this.listItem=""
    }, error=>{
      console.log("error",error)
    })
  }

  changeListToggle($event, noteId){
    this.listToggle = $event;
    if(this.tempID!=noteId){
      this.tempID = noteId;
      this.listToggle = true
    }
    this.tempID = noteId;
  }

}
