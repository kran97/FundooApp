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
  // public replyReplyContent: string;
  id: string;
  notes: any;
  froalaOpen: boolean = false;
  froalaOpen1: any = false;
  rate;
  viewReply: boolean = false;
  viewReply1: any = false;
  viewReply2: boolean = false;
  toggle: boolean = false;
  like: boolean = false;
  likeReply: boolean = false;
  likeReplyReply: boolean = false;
  // count = 0;
  // countReply = 0;
  // countReplyReply = 0;
  counting: any;

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
      this.replyContent = '';
      this.editorContent = '';
      this.toggleFroala();
    }, (error) => {
      console.log(error);
    })
  }

  closeQues() {
    this.router.navigate(['']);
  }

  toggleFroala() {
    this.froalaOpen = !this.froalaOpen;
  }

  toggleFroala1(id) {
    if(!this.toggle) {
      this.froalaOpen1 = id;
    }
    if(this.toggle) {
      this.froalaOpen1 = false;
    }
    this.toggle = !this.toggle;
  }

  toggleReply() {
    this.viewReply = !this.viewReply;
  }

  toggleReply1(id) {
    this.viewReply1 = id;    
  }

  // likeFunction(id) {
  //   this.like = !this.like;
  //   let content = {
  //     like: this.like,
  //   }
  //   let obj = {
  //     data: content,
  //     purpose: "questionAndAnswerNotes/like/" + id
  //   }
  //   this.noteService.LikeUnlikeService(obj).subscribe((result) => {
  //     if(this.like==true) {
  //       this.count++;
  //     }
  //     else {
  //       this.count--;
  //     }
  //     console.log(result , this.like);
  //   }, (error) => {
  //     console.log(error);
      
  //   })
  // }

  like1(id){
    let content = {
           like: true,
         }
         let obj = {
              data: content,
              purpose: "questionAndAnswerNotes/like/" + id
            }
            this.noteService.LikeUnlikeService(obj).subscribe((result) => {
              console.log(result);
              this.getNoteDetail();
            })
  }

  dislike1(id){
    let content = {
           like: false,
         }
         let obj = {
              data: content,
              purpose: "questionAndAnswerNotes/like/" + id
            }
            this.noteService.LikeUnlikeService(obj).subscribe((result) => {
              console.log(result);
              this.getNoteDetail();
            })
  }

  likeFunctionReply(id) {
    this.likeReply = !this.likeReply;
    let content = {
      like: this.likeReply,
    }
    let obj = {
      data: content,
      purpose: "questionAndAnswerNotes/like/" + id
    }
    this.noteService.LikeUnlikeService(obj).subscribe((result) => {
      // if(this.likeReply==true) {
      //   this.countReply++;
      // }
      // else {
      //   this.countReply--;
      // }
      console.log(result);
    }, (error) => {
      console.log(error);
      
    })
  }

  likeFunctionReplyReply(id) {
    this.likeReplyReply = !this.likeReplyReply;
    let content = {
      like: this.likeReplyReply,
    }
    let obj = {
      data: content,
      purpose: "questionAndAnswerNotes/like/" + id
    }
    this.noteService.LikeUnlikeService(obj).subscribe((result) => {
      // if(this.likeReplyReply==true) {
      //   this.countReplyReply++;
      // }
      // else {
      //   this.countReplyReply--;
      // }
      console.log(result);
    }, (error) => {
      console.log(error);
      
    })
  }

  counter(likes){
    console.log("likes....",likes);
    this.counting = 0;
    for(let i=0;i<likes.length;i++){
      if(likes[i].like==true){
        this.counting++;
      }
      
    }
   // console.log(this.counting);
    
  }

}
