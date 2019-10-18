import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();
  message: string;

  constructor() { }

  changeMessage(message) {
    this.messageSource.next(message);
  }
}