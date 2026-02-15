import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceRequest } from 'src/app/interfaces/service.modal';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css'],
})
export class ServiceRequestComponent implements OnInit{
  isCheck=false;
  isLoggedIn = false;
  location = '';
  choosenLocation = '';
  assets:any[] = [];
  assetId: string = '';
  appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
  selectedIndex = -1;
  assetIds: any[] = [];
  minServiceDate: string;



  submitForm = new FormGroup({
    servicetype: new FormControl('', Validators.required),
    serviceName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    location: new FormControl('',Validators.required),
    user_id: new FormControl(''),
    assetid: new FormControl('', Validators.required),
    serviceSubCategory:new FormControl('', Validators.required),
    // checkAgree: new FormControl(false, Validators.requiredTrue),
  });
  serviceType: any;
  serviceName: any;



  constructor(
    private apiService: ApiserviceService,
    private toast: ToastService,
    private authService: AuthService,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {
    this.minServiceDate = this.calculateMinServiceDate();
  }


  ngOnInit() {
this.getServiceCategories()
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.submitForm.get('assetid')?.valueChanges.subscribe((value) => {

      if(value) {
      this.selectedIndex = this.getIndexOfAssetId(value);
      }
      console.log('Selected Index:', this.selectedIndex);
    });



    const userId =  localStorage.getItem('USER_ID') ?? "";
    const params:any={}
    params.userId=userId;
    // params.assetCat='CIVIL';
    this.apiService.getAssetData(params).subscribe((response) => {
      console.log("*****123");
      console.log(response);
      if (response.status) {
        this.assets = response.data;
        this.assetIds = this.assets.map(obj => obj?.assetId);
        this.ref.detectChanges();

      }
    })

    this.submitForm.get('servicedate')?.valueChanges.subscribe(() => {
      this.minServiceDate = this.calculateMinServiceDate();
    });

  }

  onSelectionChange(event: any) {
    const selectedValue = event.target.value;
    const params:any={}
    params.assetSubCat=selectedValue;
    // this.apiService.getAssetData(params).subscribe((response) => {
    //   if (response.status) {
    //     this.assets = response.data;
    //     this.assetIds = this.assets.map(obj => obj?.assetId);
    //     this.ref.detectChanges();

    //   }
    // })
    this.apiService.getServiceNames(params).subscribe((response:any) => {
      console.log(response);
      this.serviceName = response.data.map((category: any) => category.serviceName);
      // Handle the response here
    }, (error: any) => {
      console.error('Error fetching data', error);
    });
  }

  private getIndexOfAssetId(assetId: string): number {
    return this.assetIds.indexOf(assetId);
  }

  private calculateMinServiceDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }



  options: any = {
    componentRestrictions: { country: 'IN' },
  };

  public handleAddressChange(place: google.maps.places.PlaceResult) {
    console.log(place.formatted_address);
    this.choosenLocation = place.formatted_address ?? '';
  }

  onSubmitRequestForm() {
    const userId = localStorage.getItem('USER_ID') ?? '';
    const data: any = {
      serviceName: this.submitForm.value.servicetype ?? '',
      description: this.submitForm.value.description ?? '',
      location: this.assets[this.selectedIndex].location,
      requestedBy: userId,
      assetId: this.submitForm.value.assetid ?? ''
    };
    this.apiService.sendSubmitRequestData(data).subscribe((res) => {
      console.log(res);
      if (res['status']) {
        this.toast.show(res.message);
        this.submitForm.reset();
      } else {
        this.toast.show(res.message);
      }
    });
  }
  onCheckboxChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.isCheck = inputElement.checked;
  }
  getServiceCategories() {
    this.apiService.getServiceType()
      .subscribe((res: any) => {
      this.serviceType = res.data.map((category: any) => category.serviceSubCategory);
    });
  }

}
