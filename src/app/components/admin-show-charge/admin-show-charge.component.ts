import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-admin-show-charge',
  templateUrl: './admin-show-charge.component.html',
  styleUrls: ['./admin-show-charge.component.css']
})
export class AdminShowChargeComponent {
  tableData: any[] = [];
  totalLength: any;
  selectedAssetBrand='';
  selectedAssetModel='';
  page: number = 1;
  itemsPerPage: number = 10;
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
    serviceCategory:new FormControl('')
  });
  assetIds: any;
  assetCats!: any[];
  assetSubCats!: any[];
  assetModels!: any[];
  assetBrands!: any[];
  screenUpdate: boolean=false;
  selectedCharge: any;

 
  constructor(private apiService: ApiserviceService,
              ) {}

  ngOnInit(): void {
    this.sCategory=localStorage.getItem('serviceCategory')
    this.getCategory()
   
    // this.serviceRequestData();
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
onDropDownChange(e:any){
  const params:any={};
  params.assetCat=e.target.value;
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


getCategory(){
  this.apiService.getServiceType().subscribe((res:any)=>{
    if(res.status){
      const data = res.data;
      this.assetCats = [...new Set(data.map((item:any) => item.serviceCategory))];

    }
  }
 
  );
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
  this.bool=true;
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
}
