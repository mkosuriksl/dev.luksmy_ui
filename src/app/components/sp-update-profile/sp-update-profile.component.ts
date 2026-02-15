import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { SpUpdatedProfile } from 'src/app/interfaces/spUpdateProfile.modal';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-sp-update-profile',
  templateUrl: './sp-update-profile.component.html',
  styleUrls: ['./sp-update-profile.component.css']
})
export class SpUpdateProfileComponent implements OnInit{

  choosenLocation = "";
  userProfileData: any;

  constructor(private apiService : ApiserviceService,
    private router: Router,
    private authService: AuthService,
    private toast: ToastService,
    private route: ActivatedRoute
   ) {}

   options: any = {
    componentRestrictions: { country: 'IN' }
  }


  updateForm = new FormGroup({
    name: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    location: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    district: new FormControl('',Validators.required),

  });

  ngOnInit(){

    const userId = localStorage.getItem('USER_ID') || '';
    this.apiService.getSpUserProfile(userId).subscribe((response) => {
      console.log("outside",response);

      if (response.status ) {

        this.userProfileData = response.userData;
        console.log("inside",this.userProfileData)

        this.updateForm.setValue({
          name: this.userProfileData.name || '',
          address: this.userProfileData.address || '',
          location: this.userProfileData.pincodeNo || '',
          city: this.userProfileData.city || '',
          state: this.userProfileData.state || '',
          district: this.userProfileData.district || '',
        });
      }
    });
  }


  public handleAddressChange(place: google.maps.places.PlaceResult) {
    console.log(place.formatted_address);
    this.choosenLocation = place.formatted_address ?? "";
  }

    updateSubmitForm() {
      // Get values from the form
      const updatedProfile: SpUpdatedProfile = {
        spName: this.updateForm.get('name')!.value ?? "",
        address: this.updateForm.get('address')!.value ?? "",
        city: this.updateForm.get('city')!.value ?? "",
        state: this.updateForm.get('state')!.value ?? "",
        district: this.updateForm.get('district')!.value ?? "",
        pincode: this.choosenLocation,
      };


      const userId = localStorage.getItem('USER_ID') ?? "";
      const appKey = this.apiService.appKey;


      this.apiService.spUpdateUserProfile(userId, updatedProfile).subscribe(
        response => {

          console.log(response);
          this.toast.show("Profile Updated Successfully!");
          this.router.navigateByUrl("sp-dashboard/sp-profile")
          

        },
        error => {
          // Handle errors
          console.error(error);

          // You can show an error message here
        }
      );
    }

}
