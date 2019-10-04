import { Component } from '@angular/core';
import { UserServicesService } from "./services/user-services.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fundooApp';

  constructor(private userServices:UserServicesService, private http: HttpClient){
    this.userServices.print("Service is Working..");
  }

  ngOnInit(){

  }
}
