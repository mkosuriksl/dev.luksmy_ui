import { Component } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-msprofile',
  templateUrl: './msprofile.component.html',
  styleUrls: ['./msprofile.component.css']
})
export class MsprofileComponent {

  profileData: any;
  constructor(private apiService: ApiserviceService) { }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    const userId = localStorage.getItem('USER_ID') || '';
    this.apiService.getMsUserProfile(userId).subscribe(
      (res: any) => {
        this.profileData = res.userData;
      },
      (error) => {
        console.error('Error fetching profile data', error);
      }
    );
  }
}
