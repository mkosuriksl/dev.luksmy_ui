import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiserviceService } from '../services/apiservice/apiservice.service';

@Component({
  selector: 'app-show-service-charges',
  templateUrl: './show-service-charges.component.html',
  styleUrls: ['./show-service-charges.component.css']
})
export class ShowServiceChargesComponent {
  tableData: any[] = [];
  selectedAssetBrand='';
  selectedAssetModel='';
  totalLength: number = 0;
  page: number = 1;
  itemsPerPage: number = 5;
  choosenLocation = "";
  subCategories: string[] = [];
  bool=false;
  sCategory!:any;
  serviceRequestForm = new FormGroup({
    serviceId: new FormControl(''),
    location: new FormControl(''),
    brand: new FormControl(''),
    model: new FormControl(''),
    subcategory: new FormControl(''),
    serviceCategory:new FormControl(localStorage.getItem('serviceCategory'))
  });
  assetIds: any;
  assetCats!: any[];
  assetSubCats!: any[];
  assetModels!: any[];
  assetBrands!: any[];
  screenUpdate: boolean=false;
  selectedCharge: any;

  onDropDownChange(){
    const params:any={};
    params.assetCat=this.sCategory;
    this.apiService.getAcategory1(params).subscribe((res:any)=>{
      if(res.status){
        const data = res.data;
        // this.assetCats = [...new Set(data.map((item:any) => item.assetCat))];
      this.assetSubCats = [...new Set(data.map((item:any) => item.assetSubCat))];
      this.assetModels = [...new Set(data.map((item:any) => item.assetModel))];
      this.assetBrands = [...new Set(data.map((item:any) => item.assetBrand))];
      }
    }
   
    );
  }
  constructor(private apiService: ApiserviceService,
              ) {}

  ngOnInit(): void {
    this.sCategory=localStorage.getItem('serviceCategory')
    this.onDropDownChange();
   
    this.serviceRequestData();
    this.getSubCategories();
    const userId =  localStorage.getItem('USER_ID') ?? "";
    const params:any={}
    params.userId=userId;
    this.apiService.getAssetData(params).subscribe((response) => {
    
      if (response.status) {
 
        this.assetIds = response.data.map((obj:any) => obj?.assetId);
   

      }
    })

 }
 options: any = {
  componentRestrictions: { country: 'IN' }
}


updateScreen(value:boolean,charge:any){
 
this.screenUpdate=value;
this.selectedCharge=charge
}

back(value:any){
  this.screenUpdate=value;
  this.search()
}


 get pagedData(): any[] {
  const start = this.page * this.totalLength;
  const end = start + this.totalLength;
  return this.tableData.slice(start, end);
}



serviceRequestData() {
  this.bool = true;
  this.tableData = [];
  const params: any = {userId:localStorage.getItem('USER_ID')};
  if (this.serviceRequestForm.value?.serviceId) {
    params.serviceId =this.serviceRequestForm.value?.serviceId;
  }
  if (this.serviceRequestForm.value?.brand) {
    params.brand =this.serviceRequestForm.value?.brand;
  }
  if (this.serviceRequestForm.value?.model) {
    params.model =this.serviceRequestForm.value?.model;
  }
  if (this.serviceRequestForm.value?.subcategory) {
    params.subcategory =this.serviceRequestForm.value?.subcategory;
  }
  if (this.serviceRequestForm.value?.location) {
    params.location =this.choosenLocation.replace(/\s+/g, '');
  }
 
  this.apiService.getServiceCharge(params).subscribe((res: any) => {
    this.bool=false;
    this.tableData = res.getData;

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
  let params:any={};
  params.serviceType=localStorage.getItem('serviceCategory');
  params.userId=localStorage.getItem('USER_ID');
  this.apiService.getServiceNames(params).subscribe((res: any) => {
    this.subCategories = res.data.map((category: any) => {
      return category.serviceType;
    });
    console.log('category', this.subCategories);
  });
}

onRecordsPerPageChange(event: Event) {
  this.itemsPerPage = +(event.target as HTMLSelectElement).value;
  this.page = 1; 
}
}
