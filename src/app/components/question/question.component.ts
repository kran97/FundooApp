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
  id : string;

  constructor(private noteService: UserServicesService, public router: Router, public activ: ActivatedRoute) { }

  ngOnInit() {
    this.activ.params.subscribe((params: Params) => {
      this.id = params['id'];
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
    }, (error)=> {
      console.log(error);
    })
  }

}
