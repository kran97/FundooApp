import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  response: any;
  error: any;

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();
  message: any;

  private objSource = new BehaviorSubject({});
  currentObj = this.objSource.asObservable();

  private booleanSource = new BehaviorSubject('');
  boolMessage = this.booleanSource.asObservable();
  bool: string;

  constructor(private http: HttpClient) { }

  print(msg) {
    console.log(msg);
  }


  link: string = environment.baseUrl;

  changeMessage(message) {
    this.messageSource.next(message);
  }

  changeObj(message) {
    this.objSource.next(message);
  }

  changeBool(bool) {
    this.booleanSource.next(bool);
  }

  registerService(url: string, userObj) {
    return this.http.post(this.link + url, userObj);
  }

  loginService(url: string, userObj) {
    return this.http.post(this.link + url, userObj);
  }

  forgotService(url: string, userObj) {
    return this.http.post(this.link + url, userObj);
  }

  getService(url: string) {
    return this.http.get(this.link+url)
  }

  addToCart(data){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }
    return this.http.post(this.link+'productcarts/addToCart', data, httpOptions)
  }

  getCartDetails(options) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.get(this.link + options.purpose, httpOptions)
  }

  resetService(options) {
    console.log("Inside Reset Service...")
    console.log("options++++++", options)
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    }
    console.log("encoded data", this.getEncodedData(options.data));
    return this.http.post(this.link + options.purpose, this.getEncodedData(options.data), httpOptions);
  }

  noteServices(options) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(this.link + options.purpose, this.getEncodedData(options.data), httpOptions);
  }

  getNoteServices(options) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.get(this.link + options.purpose, httpOptions)
  }

  getNotes(options) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.get(this.link + options.purpose, httpOptions)
  }

  getNoteByLabel(options) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(this.link + options.purpose, options.data, httpOptions)
  }

  getEncodedData(data) {
    const formBody = [];
    for (const property in data) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  noteTrashService(options) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(this.link + options.purpose, options.data, httpOptions);
  }

  getLabelService(options) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.get(this.link + options.purpose, httpOptions)
  }

  postWithTokenNotEncoded(options) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    return this.http.post(this.link + options.purpose, options.data, httpOptions);
  }

  deleteWithToken(options) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    };
    return this.http.delete(this.link + options.purpose, httpOptions);
  }

  getWithToken(options) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.get(this.link + options.purpose, httpOptions)
  }

  imageUserService(options) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(this.link + options.purpose, options.data, httpOptions);
  }

  searchUserList(data, options) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type' : 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(this.link+options, data, httpOptions);
  }

  getPatch(options) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type' : 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.patch(this.link+options.purpose, options.data, httpOptions)
  }

  deleteWithTokenJson(options) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    return this.http.delete(this.link + options.purpose, httpOptions);
  }

  remindernoteservice(Obj){
    let httpOptions = {    
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(this.link+Obj.purpose, Obj.data, httpOptions);
  }

  reminderdisplaynoteservice(options) {
    let httpOptions = {    
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.get(this.link + options.purpose, httpOptions)
  }

  reminderDeleteService(options) {
    let httpOptions = {    
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(this.link+options.purpose, options.data, httpOptions);
  }

  postQuestionAnswer(options) {
    let httpOptions = {    
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(this.link+options.purpose, options.data, httpOptions);
  }

  updateCheckList(options){
    let httpOptions = {    
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    console.log(options)
    return this.http.post(this.link+"notes/"+options.noteId+"/checklist/"+options.checklistId+"/update", options.checklistdata, httpOptions);
  }

  deleteCheckList(options){
    let httpOptions={
      headers: new HttpHeaders({
        'content-type':'application/json',
        'Authorization' : localStorage.getItem('token')
      })
    }
    console.log(options)
    return this.http.post(this.link+"notes/"+options.noteId+"/checklist/"+options.checklistId+"/remove", options.checklistdata, httpOptions);
  }

  addList(options){
    let httpOptions={
      headers: new HttpHeaders({
        'content-type':'application/json',
        'Authorization' : localStorage.getItem('token')
      })
    }
    console.log(options)
    return this.http.post(this.link+"notes/"+options.noteId+"/checklist/add", options.data, httpOptions);
  }

}