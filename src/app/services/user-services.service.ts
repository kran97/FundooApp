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
  message: string;

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

}