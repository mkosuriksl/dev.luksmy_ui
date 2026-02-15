import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-sp-update-availability',
  templateUrl: './sp-update-availability.component.html',
  styleUrls: ['./sp-update-availability.component.css']
})
export class SpUpdateAvailabilityComponent {

  constructor(private apiService: ApiserviceService,
              private toast: ToastService) {

  }

  choosenLocation = "";

  updateForm = new FormGroup({
    location: new FormControl('', Validators.required),
    availability: new FormControl(null, Validators.required),
  });

  options: any = {
    componentRestrictions: { country: 'IN', }
  }


  public handleAddressChange(place: google.maps.places.PlaceResult) {
    console.log(place.formatted_address);
    this.choosenLocation = place.formatted_address ?? "";
  }

  updateSubmitForm() {
    const location = this.choosenLocation;
    const availability = this.updateForm.value.availability ?? "";
    if (availability !== null) {

      const spId: string | null = localStorage.getItem('USER_ID') ?? "";

      // Call the API service method
      this.apiService.updateServicePersonStatus(spId, availability, location)
        .subscribe(
          (response) => {
            console.log(response);
            if (response.status === true) {
               this.toast.show('Status successfully updated');
            } else {
              this.toast.show('Failed to update status');

            }

          },
          (error) => {
            console.error(error);
            // Handle error, e.g., show an error message
          }
        );
    } else {
      // Handle the case where availability is null (optional)
    }
  }

}
