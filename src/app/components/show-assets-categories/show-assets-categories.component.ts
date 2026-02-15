import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-show-assets-categories',
  templateUrl: './show-assets-categories.component.html',
  styleUrls: ['./show-assets-categories.component.css']
})
export class ShowAssetsCategoriesComponent implements OnInit{
  assetCats: any[] = [];
  assetSubCats: any[] = [];
  assetModels: any[] = [];
  assetBrands: any[] = [];

  selectedAssetCat: any = '';
  selectedAssetSubCat: any = '';
  selectedAssetModel: any = '';
  selectedAssetBrand: any = '';
  assetCategoryData: any[] = [];
bool=false;
  
  // userId = localStorage.getItem('USER_ID') ?? "";

  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 2;

  addServiceForm!: FormGroup;
  constructor(private apiService: ApiserviceService, private router: Router,private fb: FormBuilder) {}

  ngOnInit(): void {
    this.onDropDownChange()
    this.addServiceForm = this.fb.group({
      assetCat: [''],
      assetSubCat:[''],
      assetBrand: [''],
      assetModel:[''],
      assetId:['']
    });
  }
  search(){
    this.getAssetCategoryData();
  }

 get pagedData(): any[] {
  const start = this.page * this.totalLength;
  const end = start + this.totalLength;
  return this.assetCategoryData.slice(start, end);
}

getAssetCategoryData() {
  this.bool=true;
  const params:any={};
  if(this.addServiceForm.value.assetCat){
    params.assetCat=this.addServiceForm.value.assetCat
  }
  if(this.addServiceForm.value.assetSubCat){
    params.assetSubCat=this.addServiceForm.value.assetSubCat
  }
  if(this.addServiceForm.value.assetModel){
    params.assetModel=this.addServiceForm.value.assetModel
  }
  if(this.addServiceForm.value.assetBrand){
    params.assetBrand=this.addServiceForm.value.assetBrand
  }
  if(this.addServiceForm.value.assetId){
    params.assetId=this.addServiceForm.value.assetId
  }
  this.apiService.getAcategory1(params).subscribe(
    (response) => {
      this.bool=false;
      this.assetCategoryData = response.data;
    },
    (error) => {
      this.bool=false;
      console.error('Error fetching asset category data:', error);
    }
  );
}

editAssetCategory(assetId: string) {
  
  this.router.navigate(['dashboard/edit-asset-category',assetId]);
}

onDropDownChange1(value:any){
  const params:any={};
    params.assetCat=value.target.value
  this.apiService.getAcategory1(params).subscribe((res:any)=>{
    if(res.status){
      const data = res.data;
      // this.assetCats = [...new Set(data.map((item:any) => item.assetCat))];
    this.assetSubCats = [...new Set(data.map((item:any) => item.assetSubCat))];
    this.assetModels = [...new Set(data.map((item:any) => item.assetModel))];
    this.assetBrands = [...new Set(data.map((item:any) => item.assetBrand))];
    // this.assetId = [...new Set(data.map((item:any) => item.assetId))];
    }
  })
}

onDropDownChange(){
  this.apiService.getServiceType().subscribe((res:any)=>{
    if(res.status){
      const data = res.data;
      this.assetCats = [...new Set(data.map((item:any) => item.serviceCategory))];

    }
  }
 
  );
}

}
