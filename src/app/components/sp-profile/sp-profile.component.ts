import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-sp-profile',
  templateUrl: './sp-profile.component.html',
  styleUrls: ['./sp-profile.component.css']
})
export class SpProfileComponent implements OnInit{

  profileData: any;

  constructor(private apiService: ApiserviceService) {}

  ngOnInit() {
    this.getUserProfile();
  }


  getUserProfile() {
    const userId = localStorage.getItem('USER_ID') || '';

    this.apiService.getSpUserProfile(userId).subscribe(
      (response: any) => {

        this.profileData = response.userData;

        console.log("123123123");
        console.log(this.profileData);
      },
      (error) => {
        // Handle errors
        console.error('Error fetching profile data', error);
      }
    );
  }

}
