import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-service-person-page',
  templateUrl: './service-person-page.component.html',
  styleUrls: ['./service-person-page.component.css']
})
export class ServicePersonPageComponent implements OnInit{

  tableData: any[] = [];
  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 5;
  serviceCategories: any[] = [];
  choosenLocation = '';
bool=false;
  servicePersonForm = new FormGroup({
    serviceCategory: new FormControl(''),
    serviceSubCategory: new FormControl(''),
    userEmail: new FormControl(''),
    userMobile: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    status: new FormControl(''),
    userState: new FormControl(''),


  });
  serviceSubCategories: any=[];

  constructor(private apiService: ApiserviceService) {}

  ngOnInit(): void {
     this.servicePersonData();
    //  this.getServiceCategories();
    this.onDropDownChange()
  }

  getServiceCategories() {
    this.apiService.getScategory().subscribe((res: any) => {
      // this.serviceCategories = res.data.map((category: any) => category.serviceCategory);
      // console.log("test");
      // console.log(this.serviceCategories);
      const sc = res.data.map((category: any) => category.serviceCategory);
      this.serviceCategories = [...new Set(sc)];
     


    });
  }
  options: any = {
    componentRestrictions: { country: 'IN' },
  };

  public handleAddressChange(place: google.maps.places.PlaceResult) {
    console.log(place.formatted_address);
    this.choosenLocation = place.formatted_address ?? '';
  }

  servicePersonData() {
this.bool=true;
    const params: any = {};
     if (this.servicePersonForm.value?.status) {
      params.status = this.servicePersonForm.value?.status;
    }
    if (this.servicePersonForm.value?.fromDate) {
      params.fromDate = this.servicePersonForm.value?.fromDate;
    }
    if (this.servicePersonForm.value?.toDate) {
      params.toDate = this.servicePersonForm.value?.toDate;
    }
    if (this.servicePersonForm.value?.userEmail) {
      params.email = this.servicePersonForm.value?.userEmail;
    }
    if (this.servicePersonForm.value?.userMobile) {
      params.phNo = this.servicePersonForm.value?.userMobile;
    }
    if (this.servicePersonForm.value?.userState) {
      params.userState = this.servicePersonForm.value?.userState;
    }
    if (this.servicePersonForm.value?.serviceCategory) {
      params.serviceCategory = this.servicePersonForm.value?.serviceCategory;
    }
    // if (typeof status === 'string') {
      this.apiService.searchPerson(params).subscribe((res: any) => {
        console.log(res);
        this.bool=false;
        this.tableData = res.data;
      });
    // } else {

    // }
  }
  get pagedData(): any[] {
    const start = this.page * this.totalLength;
    const end = start + this.totalLength;
    return this.tableData.slice(start, end);
  }
  onDropDownChange1(value:any){
    const params:any={};
      params.assetCat=value.target.value
    this.apiService.getAcategory1(params).subscribe((res:any)=>{
      if(res.status){
        const data = res.data;
        // this.assetCats = [...new Set(data.map((item:any) => item.assetCat))];
      this.serviceSubCategories = [...new Set(data.map((item:any) => item.assetSubCat))];
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
  
  

}
