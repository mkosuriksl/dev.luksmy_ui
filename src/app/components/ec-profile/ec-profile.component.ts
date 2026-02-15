import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-ec-profile',
  templateUrl: './ec-profile.component.html',
  styleUrls: ['./ec-profile.component.css']
})
export class EcProfileComponent implements OnInit{

  profileData: any = {};


  constructor(
    private apiService: ApiserviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

      const user_id = localStorage.getItem("USER_ID") ?? "";
      const apiKey = this.apiService.appKey;
      this.apiService.getEcUserProfileData(user_id)
        .subscribe(response => {
          console.log("1111111111111111111111");
          console.log(response);
          this.profileData = response;
        }, error => {
          console.error('Failed to fetch profile data');
        });
    ;
  }

 

}
