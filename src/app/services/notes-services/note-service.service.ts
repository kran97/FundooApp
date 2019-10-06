import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment'
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  link: any = environment.baseUrl;

  constructor(private http: HttpClient) { }

  noteServices(options) {
    let httpOptions={
      headers : new HttpHeaders({
        'Content-type':'application/x-www-form-urlencoded',
        'Authorization':localStorage.getItem('id')
      })
    }
    return this.http.post(this.link+options.purpose, this.getEncodedData(options.data), httpOptions);
  }

  getNoteServices(options){
    let httpOptions={
      headers:new HttpHeaders({
        'Content-type':'application/x-www-form-urlencoded',
        'Authorization':localStorage.getItem('id')
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
