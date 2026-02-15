import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../services/apiservice/apiservice.service';
import { AuthService } from '../services/auth/auth.service';
import { DatePipe } from '@angular/common';
import { ToastService } from '../services/toast/toast.service';

@Component({
  selector: 'app-ec-service-request',
  templateUrl: './ec-service-request.component.html',
  styleUrls: ['./ec-service-request.component.css']
})
export class EcServiceRequestComponent implements OnInit{
  tableData: any[] = [];
  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 5;
  choosenLocation = "";
  subCategories: string[] = [];
  bool=false;

  serviceRequestForm = new FormGroup({
    serviceCategory: new FormControl(''),
    serviceName: new FormControl(''),
    location: new FormControl(''),
    email: new FormControl(''),
    requestStatus: new FormControl(''),
    phoneNo: new FormControl(''),
    assetId: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    status:new FormControl(''),
  });
  assetIds: any;


  constructor(private apiService: ApiserviceService,
              private authService: AuthService,private toast:ToastService
              ) {}

  ngOnInit(): void {
    // this.serviceRequestData();
    this.getSubCategories();
    const userId =  localStorage.getItem('USER_ID') ?? "";
    const params:any={}
    params.userId=userId;
    this.apiService.getAssetData(params).subscribe((response) => {
      console.log("*****123");
      console.log(response);
      if (response.status) {
 
        this.assetIds = response.data.map((obj:any) => obj?.assetId);
   

      }
    })

 }
 options: any = {
  componentRestrictions: { country: 'IN' }
}



 get pagedData(): any[] {
  const start = this.page * this.totalLength;
  const end = start + this.totalLength;
  return this.tableData.slice(start, end);
}



serviceRequestData() {
  this.bool=true;
  this.tableData = [];
  const params: any = {};
  if (this.serviceRequestForm.value?.serviceCategory) {
    params.serviceName =this.serviceRequestForm.value?.serviceCategory;
  }
  if (this.serviceRequestForm.value?.email) {
    params.email =this.serviceRequestForm.value?.email;
  }
  if (this.serviceRequestForm.value?.phoneNo) {
    params.mobile =this.serviceRequestForm.value?.phoneNo;
  }
  if (this.serviceRequestForm.value?.fromDate) {
    params.fromDate =this.serviceRequestForm.value?.fromDate;
  }
  if (this.serviceRequestForm.value?.toDate) {
    params.toDate =this.serviceRequestForm.value?.toDate;
  }
  if (this.serviceRequestForm.value?.assetId) {
    params.assetId =this.serviceRequestForm.value?.assetId;
  }
  if (this.serviceRequestForm.value?.status) {
    params.status =this.serviceRequestForm.value?.status;
  }
  if (this.serviceRequestForm.value?.location) {
    params.location =this.choosenLocation.replace(/\s+/g, '');
  }
 
  this.apiService.getEcServiceRequestData(params).subscribe((res: any) => {
    this.bool=false;
    if(res.data.length==0){
      this.toast.show("No Data Available",3000)
    }
    this.tableData = res.data;

  });
}
search(){
  this.serviceRequestData();
}
public handleAddressChange(place: google.maps.places.PlaceResult) {
  console.log(place.formatted_address);
  this.choosenLocation = place.formatted_address ?? "";
}

getSubCategories() {
  this.apiService.getScategory().subscribe((res: any) => {
    console.log("**123**")
    console.log(res);
    this.subCategories = res.data.map((category: any)=> {
      return category.serviceSubCategory
      // console.log("category data",this.subCategories)

    });
    console.log("category",this.subCategories);
  });
}

}
