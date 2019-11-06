import { Component, OnInit } from '@angular/core';
import { Question } from "../../models/question.model";
import { UserServicesService } from 'src/app/services/user-services.service';
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public questionModel: any = new Question;
  public editorContent: string;
  public replyContent: string;
  id: string;
  notes: any;
  froalaOpen: boolean = false;

  constructor(private noteService: UserServicesService, public router: Router, public activ: ActivatedRoute) { }

  ngOnInit() {
    this.activ.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.getNoteDetail()
    // this.noteService.currentObj.subscribe((result)=> {
    //   console.log("QUESTION WALA LOG ", result.title);
    // })
  }

  getNoteDetail() {
    let options = {
      purpose: "notes/getNotesDetail/" + this.id
    }
    this.noteService.getNotes(options).subscribe(data => {
      this.notes = data['data']['data'];
      console.log("NOTES ",data['data']['data'])
    }, (error) => {
      console.log(error);
    })
  }

  submit() {
    this.questionModel = {
      message: this.editorContent,
      createdDate: Date.now(),
      notesId: this.id
    }
    let options = {
      data: this.questionModel,
      purpose: 'questionAndAnswerNotes/addQuestionAndAnswer'
    }
    this.noteService.postQuestionAnswer(options).subscribe((Obj) => {
      console.log(Obj);
      this.getNoteDetail();
    }, (error) => {
      console.log(error);
    })
  }

  submitReply(id:string) {
    this.questionModel = {
      message: this.replyContent,
      createdDate: Date.now(),
      notesId: this.id
    }
    let options = {
      data: this.questionModel,
      purpose: 'questionAndAnswerNotes/reply/' + id
    }
    this.noteService.postQuestionAnswer(options).subscribe((Obj) => {
      console.log(Obj);
      this.getNoteDetail();
    }, (error) => {
      console.log(error);
    })
  }

  closeQues() {
    this.router.navigate(['']);
  }

  toggleFroala() {
    this.froalaOpen = !this.froalaOpen
  }

}
