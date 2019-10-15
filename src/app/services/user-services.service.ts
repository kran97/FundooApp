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

  constructor(private http: HttpClient) { }

  print(msg)
  {
    console.log(msg);
  }

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();
  message : string;

  link : string = environment.baseUrl;

  registerService(url:string, userObj){
   return this.http.post(this.link+url, userObj);
  }

  loginService(url:string, userObj) {
    return this.http.post(this.link+url, userObj);
  }

  forgotService(url:string, userObj) {
    return this.http.post(this.link+url, userObj);
  }

  resetService(options) {
    console.log("Inside Reset Service...")
    console.log("options++++++" , options)
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-type':'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    }
    console.log("encoded data",this.getEncodedData(options.data) );
    return this.http.post(this.link+options.purpose, this.getEncodedData(options.data), httpOptions);
  }

  noteServices(options) {
    let httpOptions={
      headers : new HttpHeaders({
        'Content-type':'application/x-www-form-urlencoded',
        'Authorization':localStorage.getItem('token')
      })
    }
   
    
    return this.http.post(this.link+options.purpose, this.getEncodedData(options.data), httpOptions);
  }

  getNoteServices(options){
    let httpOptions={
      headers:new HttpHeaders({
        'Content-type':'application/x-www-form-urlencoded',
        'Authorization':localStorage.getItem('token')
      })
    }
    return this.http.get(this.link+options.purpose,httpOptions)
  }

  getEncodedData(data){
    const formBody=[];
    for(const property in data){
      const encodedKey=encodeURIComponent(property);
      const encodedValue=encodeURIComponent(data[property]);
      formBody.push(encodedKey+'='+encodedValue);
    }
    return formBody.join ('&');
  }

  changeMessage(message){
    this.messageSource.next(message);
  }

  noteTrashService(options) {
    let httpOptions={
      headers : new HttpHeaders({
        'Content-type':'application/json',
        'Authorization':localStorage.getItem('token')
      })
    }
    return this.http.post(this.link+options.purpose, options.data, httpOptions);
  }

}