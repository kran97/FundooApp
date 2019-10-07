import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

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

  link : string = environment.baseUrl;

  registerService(url:string, userObj){
   return this.http.post(this.link+url, userObj);
  }

  loginService(url:string, userObj) {
    return this.http.post(this.link+url, userObj);
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

}