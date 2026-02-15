import { Component } from '@angular/core';
import { ApiserviceService } from '../services/apiservice/apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/toast/toast.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SpUpdatedProfile } from '../interfaces/spUpdateProfile.modal';

@Component({
  selector: 'app-ms-update-profile',
  templateUrl: './ms-update-profile.component.html',
  styleUrls: ['./ms-update-profile.component.css']
})
export class MsUpdateProfileComponent {

  choosenLocation = "";
  userProfileData: any;

  constructor(private apiService: ApiserviceService,
    private router: Router,
    private authService: AuthService,
    private toast: ToastService,
    private route: ActivatedRoute
  ) { }

  options: any = {
    componentRestrictions: { country: 'IN' }
  }


  updateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),

  });

  ngOnInit() {
    const userId = localStorage.getItem('USER_ID') || '';
    this.apiService.getSpUserProfile(userId).subscribe((response) => {
      if (response.status) {
        this.userProfileData = response.userData;
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

    this.apiService.msUpdateUserProfile(userId, updatedProfile).subscribe(
      (res: any) => {
        this.toast.show("Profile Updated Successfully!");
        this.router.navigateByUrl("ms-dashboard/ms-profile")
      },
      (error: any) => {
        this.toast.show("Failed to update profile. Please try again.");
      }
    );
  }
}
