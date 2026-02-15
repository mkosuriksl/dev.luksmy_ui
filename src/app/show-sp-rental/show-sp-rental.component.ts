import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice/apiservice.service';
import { EditRentalComponent } from '../edit-rental/edit-rental.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-show-sp-rental',
  templateUrl: './show-sp-rental.component.html',
  styleUrls: ['./show-sp-rental.component.css']
})
export class ShowSpRentalComponent {
  bool=false;
  assetCategoryData!:any;
    // userId = localStorage.getItem('USER_ID') ?? "";
    selectedAssetCat: any = '';
  selectedAssetSubCat: any = '';
  selectedAssetModel: any = '';
  selectedAssetBrand: any = '';
    totalLength: any;
    page: number = 1;
    itemsPerPage: number = 5;
    choosenLocation='';
    options: any = {
      componentRestrictions: { country: 'IN' }
    }
  editMode: boolean=false;
  selected: any;
  serviceRequestForm = new FormGroup({
    assetId: new FormControl(''),
    assetSubCat: new FormControl(''),
    assetCat: new FormControl(localStorage.getItem('serviceCategory')),
    location: new FormControl(''),
    assetBrand: new FormControl(''),
    assetModel: new FormControl(''),
    
  });
  assetCats: any=[];
  assetSubCats: any=[];
  assetModels: any=[];
  assetBrands: any=[];
  
    constructor(private apiService: ApiserviceService,private dialog: MatDialog,private router: Router,private fb: FormBuilder) {}
  
    ngOnInit(): void {
     this.onDropDownChange();
     this.getAssetCategoryData();
    }
    search(){
      this.getAssetCategoryData();
    }
    public handleAddressChange(place: google.maps.places.PlaceResult) {
      console.log(place.formatted_address);
      this.choosenLocation = place.formatted_address ?? "";
    }
  //  get pagedData(): any[] {
  //   const start = this.page * this.totalLength;
  //   const end = start + this.totalLength;
  //   return this.getAssetCategoryData.slice(start, end);
  // }
  editRental(item: any) {
    this.selected=item
  this.editMode=true
  }
  onRecordsPerPageChange(event: Event) {
    this.itemsPerPage = +(event.target as HTMLSelectElement).value;
    this.page = 1; 
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

  back(val:any){
this.editMode=false;
this.getAssetCategoryData();
  }
  getAssetCategoryData() {
    let params: any = {};
    params.userId = localStorage.getItem('USER_ID');
    
    if (this.serviceRequestForm.value?.assetId) {
      params.assetId = this.serviceRequestForm.value?.assetId;
    }
    if (this.serviceRequestForm.value?.assetSubCat) {
      params.assetSubCat = this.serviceRequestForm.value?.assetSubCat;
    }
    if (this.serviceRequestForm.value?.location) {
      params.availableLocation = this.choosenLocation.replace(/\s+/g, '');
    }
    if (this.serviceRequestForm.value?.assetBrand) {
      params.assetBrand = this.serviceRequestForm.value?.assetBrand;
    }
    if (this.serviceRequestForm.value?.assetModel) {
      params.assetModel = this.serviceRequestForm.value?.assetModel;
    }
    this.apiService.getSpRental(params).subscribe(
      (response) => {
        this.bool=false;
        this.assetCategoryData = response.rentalData;
      },
      (error) => {
        this.bool=false;
        console.error('Error fetching asset category data:', error);
      }
    );
  }
  
  editAssetCategory(assetId: string) {
    console.log("**********8test");
    this.router.navigate(['dashboard/edit-asset-category',assetId]);
  }
}
