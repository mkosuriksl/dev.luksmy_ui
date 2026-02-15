import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ApiserviceService } from '../services/apiservice/apiservice.service';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/toast/toast.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-sp-rental',
  templateUrl: './update-sp-rental.component.html',
  styleUrls: ['./update-sp-rental.component.css']
})
export class UpdateSpRentalComponent {
  choosenLocation = "";
  @Input() data: any;
  constructor(private apiService : ApiserviceService,

    private toast: ToastService,
    private fb:FormBuilder,

   
   ) {}

   options: any = {
    componentRestrictions: { country: 'IN' }
  }

updateForm!: FormGroup;
@Output() back:EventEmitter<boolean>=new EventEmitter<boolean>;

  ngOnInit(){
    console.log("nj");
    console.log(this.data)
    this.updateForm = this.fb.group({
      amountPerDay: new FormControl(this.data.amountPerDay,Validators.required),
      amountper30days: new FormControl(this.data.amountPer30days,Validators.required),
      isAvailRent: new FormControl(this.data.isAvailRent,Validators.required),
      delivery: new FormControl(this.data.delivery,Validators.required),
      pickup: new FormControl(this.data.pickup,Validators.required),
      userId:new FormControl(this.data.userId,Validators.required),
      assetId:new FormControl(this.data.assetId,Validators.required),
      availableLocation:new FormControl(this.data?.location,Validators.required),
    });
    
  }

  public handleAddressChange(place: google.maps.places.PlaceResult) {
    console.log(place.formatted_address);
    this.choosenLocation = place.formatted_address ?? "";
  }



  cancel(){
    this.back.emit(false);
  }
  
  updateSubmitForm() {

      this.apiService.updateSpRental(this.updateForm.value).subscribe(
        response => {

          console.log(response);
          this.toast.show("Rental updated Successfully!");
          this.back.emit(false);

        },
        error => {
          // Handle errors
          console.error(error);

          this.toast.show("Error occured!");
        }
      );

    }
}
