import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';


@Component({
  selector: 'app-service-request-page',
  templateUrl: './service-request-page.component.html',
  styleUrls: ['./service-request-page.component.css']
})
export class ServiceRequestPageComponent implements OnInit{

  tableData: any[] = [];
  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 10;
  choosenLocation = "";
  subCategories: any = [];
  bool=false;

  serviceRequestForm = new FormGroup({
    serviceCategory: new FormControl(''),
    serviceSub:new FormControl(''),
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
  serviceCategories: any=[];


  constructor(private apiService: ApiserviceService,
              ) {}

  ngOnInit(): void {
   this.onDropDownChange()
 
    const userId =  localStorage.getItem('USER_ID') ?? "";
    const params:any={}
    params.userId=userId;
    this.apiService.getAssetData(params).subscribe((response) => {
     
      if (response.status) {
 
        this.assetIds = response.data.map((obj:any) => obj?.assetId);
   

      }
    })

 }

 onDropDownChange1(value:any){
  const params:any={};
    params.assetCat=value.target.value
  this.apiService.getAcategory1(params).subscribe((res:any)=>{
    if(res.status){
      const data = res.data;
      // this.assetCats = [...new Set(data.map((item:any) => item.assetCat))];
    this.subCategories = [...new Set(data.map((item:any) => item.assetSubCat))];
    // this.assetModels = [...new Set(data.map((item:any) => item.assetModel))];
    // this.assetBrands = [...new Set(data.map((item:any) => item.assetBrand))];
    // this.assetId = [...new Set(data.map((item:any) => item.assetId))];
    }
  })
}

onDropDownChange(){
  this.apiService.getServiceType().subscribe((res:any)=>{
    if(res.status){
      const data = res.data;
      this.serviceCategories = [...new Set(data.map((item:any) => item.serviceCategory))];

    }
  }
 
  );
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
    this.tableData = res.data.sort((a: any, b: any) => {
      const dateA = new Date(a.serviceRequestDate);
      const dateB = new Date(b.serviceRequestDate);
  
      return dateB.getTime() - dateA.getTime(); // For descending order
    });

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
