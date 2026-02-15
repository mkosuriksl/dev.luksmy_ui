
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ApiserviceService } from '../services/apiservice/apiservice.service';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/toast/toast.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-sp-rental',
  templateUrl: './add-sp-rental.component.html',
  styleUrls: ['./add-sp-rental.component.css']
})
export class AddSpRentalComponent {
  choosenLocation = "";
  @Input() data: any;
  constructor(private apiService : ApiserviceService,
    private router: Router,
    private authService: AuthService,
    private toast: ToastService,
    private fb:FormBuilder,
    private route: ActivatedRoute,
   
   ) {}

   options: any = {
    componentRestrictions: { country: 'IN' }
  }

updateForm!:FormGroup;
  

  ngOnInit(){
    this.updateForm = this.fb.group({
      amountPerDay: new FormControl('',Validators.required),
      amountper30days: new FormControl('',Validators.required),
      isAvailRent: new FormControl('',Validators.required),
      delivery: new FormControl('',Validators.required),
      pickup: new FormControl('',Validators.required),
      userId:new FormControl(this.data.userId,Validators.required),
      assetId:new FormControl(this.data.assetId,Validators.required),
      availableLocation:new FormControl(this.data?.location,Validators.required),
    });
    
  }

  public handleAddressChange(place: google.maps.places.PlaceResult) {
    console.log(place.formatted_address);
    this.choosenLocation = place.formatted_address ?? "";
  }

  @Output() back:EventEmitter<boolean>=new EventEmitter<boolean>;

  cancel(){
    this.back.emit(false);
  }
  
  updateSubmitForm() {

      this.apiService.addSpRental(this.updateForm.value).subscribe(
        response => {

          console.log(response);
          this.toast.show("Rental added Successfully!");
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
