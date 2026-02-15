import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ApiserviceService } from '../services/apiservice/apiservice.service';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/toast/toast.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-rental',
  templateUrl: './add-rental.component.html',
  styleUrls: ['./add-rental.component.css']
})
export class AddRentalComponent {
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
    isAvailRent: new FormControl('',Validators.required),
    delivery: new FormControl('',Validators.required),
    pickup: new FormControl('',Validators.required),

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
          assetId: this.data?.item.assetId,
          userId: userId,
          isAvailRent: this.updateForm.value.isAvailRent,
          amountPerDay: this.updateForm.value.amountPerDay,
          amountper30days:this.updateForm.value.amountper30days,
          pickup: this.updateForm.value.pickup,
          availableLocation:this.data?.item.location,
          delivery: this.updateForm.value.delivery
      }
      

      this.apiService.addRental(body).subscribe(
        response => {

          console.log(response);
          this.toast.show("Rental added Successfully!");

        },
        error => {
          // Handle errors
          console.error(error);

          this.toast.show("Error occured!");
        }
      );

    }
}
