import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}