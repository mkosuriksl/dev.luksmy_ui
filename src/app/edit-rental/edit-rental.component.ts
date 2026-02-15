import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../services/apiservice/apiservice.service';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/toast/toast.service';

@Component({
  selector: 'app-edit-rental',
  templateUrl: './edit-rental.component.html',
  styleUrls: ['./edit-rental.component.css']
})
export class EditRentalComponent {
  choosenLocation = "";

  constructor(private apiService : ApiserviceService,
    private router: Router,
    private authService: AuthService,
    private toast: ToastService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
   ) {}

   options: any = {
    componentRestrictions: { country: 'IN' }
  }


  updateForm = new FormGroup({
    amountPerDay: new FormControl('',Validators.required),
    amountper30days: new FormControl('',Validators.required),
  });

  ngOnInit(){

    
  }

  public handleAddressChange(place: google.maps.places.PlaceResult) {
    console.log(place.formatted_address);
    this.choosenLocation = place.formatted_address ?? "";
  }

  updateSubmitForm() {
    console.log(this.data,'data')
    const userId = localStorage.getItem('USER_ID') ?? "";
      let body={
          assetId: this.data.item.assetId,
          userId: userId,
          isAvailRent: this.data.item.isAvailRent,
          amountPerDay: this.updateForm.value.amountPerDay,
          amountper30days:this.updateForm.value.amountper30days,
          pickup: this.data.item.pickup,
          availableLocation:this.data.item.location,
          delivery: this.data.item.delivery
      }
      

      this.apiService.updateRental(body).subscribe(
        (response: any) => {

          console.log(response);
          this.toast.show("Rental updated Successfully!");

        },
        (error: any) => {
          // Handle errors
          console.error(error);

          this.toast.show("Error occured!");
        }
      );

    }
}
