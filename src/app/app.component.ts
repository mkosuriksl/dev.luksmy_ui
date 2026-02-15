import { Component } from '@angular/core';
import { ApiserviceService } from './services/apiservice/apiservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
loaded:boolean=true;
  constructor(private api:ApiserviceService){

  }
  title = 'carstand';
  isLoggedIn = false;
  logout() {
    
  }
}
