import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditAssetDataComponent } from '../edit-asset-data/edit-asset-data.component';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AddRentalComponent } from 'src/app/add-rental/add-rental.component';

@Component({
  selector: 'app-edit-assets',
  templateUrl: './edit-assets.component.html',
  styleUrls: ['./edit-assets.component.css']
})
export class EditAssetsComponent implements OnInit{
  assetData: any[] = [];
  choosenLocation=""
  userId = localStorage.getItem('USER_ID') ?? "";
  assetCats: any[] = [];
  assetSubCats: any[] = [];
  assetModels: any[] = [];
  assetBrands: any[] = [];

  selectedAssetCat: any = '';
  selectedAssetSubCat: any = '';
  selectedAssetModel: any = '';
  selectedAssetBrand: any = '';
  editMode:boolean=false;
  selected:any;
  totalLength: number = 0;
  page: number = 1;
  itemsPerPage: number = 5;
  subCategories: any;
  assetIds: any;
  rental:boolean=false;
  assetId: any[]=[];
  rentalSelected: any;

  bool: boolean = false;
  myServices: any[] = [];
  constructor(private apiService: ApiserviceService, private router: Router,private dialog: MatDialog,private toast:ToastService) {}

  serviceRequestForm = new FormGroup({
    assetId: new FormControl(''),
    assetSubCat: new FormControl(''),
    assetCat: new FormControl(localStorage.getItem('serviceCategory')),
    location: new FormControl(''),
    assetBrand: new FormControl(''),
    assetModel: new FormControl(''),
    
  });

  ngOnInit(): void {
    this.onDropDownChange()
    this.getAssetData();
    const params:any={}
    const userId =  localStorage.getItem('USER_ID') ?? "";
    params.userId=userId;
  }

 get pagedData(): any[] {
  const start = this.page * this.totalLength;
  const end = start + this.totalLength;
  return this.assetData.slice(start, end);
}
options: any = {
  componentRestrictions: { country: 'IN' }
}

back(val:any)
{
this.editMode=false;
this.rental=false;
this.search()
}
search(){
  this.getAssetData();
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
getAssetData() {
  const params:any={}
  if (this.serviceRequestForm.value?.assetCat && !this.serviceRequestForm.value?.assetSubCat) {
    this.toast.show("Please select asset sub category", 3000);
    this.assetData = [];
    return; // Exit the function early
  }else{
params.userId=localStorage.getItem('USER_ID')
 
  if (this.serviceRequestForm.value?.assetId) {
    params.assetId =this.serviceRequestForm.value?.assetId;
  }
  if (this.serviceRequestForm.value?.assetSubCat) {
    params.assetSubCat =this.serviceRequestForm.value?.assetSubCat;
  }
  if (this.serviceRequestForm.value?.location) {
    params.location =this.choosenLocation.replace(/\s+/g, '');
  }
  if (this.serviceRequestForm.value?.assetBrand) {
    params.assetBrand =this.serviceRequestForm.value?.assetBrand;
  }
  if (this.serviceRequestForm.value?.assetModel) {
    params.assetModel =this.serviceRequestForm.value?.assetModel;
  }
  this.apiService.getSpAssetData(params).subscribe(
    (data) => {
      if(data.data.length==0)  this.toast.show("No records found", 3000);
      this.assetData = data.data;
    },
    (error) => {
      console.error('Error fetching asset data:', error);
}
  );
}
}
onRecordsPerPageChange(event: Event) {
  this.itemsPerPage = +(event.target as HTMLSelectElement).value;
  this.page = 1; 
}

editAsset(item: any) {
  this.selected=item;
  this.editMode=true;
}
addRental(item: any) {
 this.rental=true;
 this.selected=item;
}
onDropDownChange(){
  const params:any={};
    params.assetCat=localStorage.getItem('serviceCategory');
  this.apiService.getAcategory1(params).subscribe((res:any)=>{
    if(res.status){
      const data = res.data;
      this.assetCats = [...new Set(data.map((item:any) => item.assetCat))];
    this.assetSubCats = [...new Set(data.map((item:any) => item.assetSubCat))];
    this.assetModels = [...new Set(data.map((item:any) => item.assetModel))];
    this.assetBrands = [...new Set(data.map((item:any) => item.assetBrand))];
    // this.assetId = [...new Set(data.map((item:any) => item.assetId))];
    }
  }
 
  );
}

}
