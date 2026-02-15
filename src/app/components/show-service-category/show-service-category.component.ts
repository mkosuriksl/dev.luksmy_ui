import { ImplicitReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-show-service-category',
  templateUrl: './show-service-category.component.html',
  styleUrls: ['./show-service-category.component.css']
})
export class ShowServiceCategoryComponent {
  serviceCategoryData: any[] = [];
bool=false;
  
  // userId = localStorage.getItem('USER_ID') ?? "";

  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 5;
  addServiceForm!: FormGroup;
  serviceCategories: any;
  serviceName!: any[];
  constructor(private apiService: ApiserviceService, private router: Router,private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addServiceForm = this.fb.group({
      serviceCategory: [''],
      serviceSubCategory:[''],
    });
  //  this.getServiceCategories() 
  this.onDropDownChange()
  }


 get pagedData(): any[] {
  const start = this.page * this.totalLength;
  const end = start + this.totalLength;
  return this.serviceCategoryData.slice(start, end);
}
search(){
  this.getServiceCategoryData();
}
getServiceCategories() {
  this.apiService.getScategory().subscribe((res: any) => {
    this.serviceCategories = res.data.map((category: any) => category.serviceSubCategory);
    const serviceCategories = res.data.map((category: any) => category.serviceCategory);
    const uniqueServiceCategories = [...new Set(serviceCategories)];
    this.serviceName = uniqueServiceCategories;
  

  });
}
getServiceCategoryData() {
  this.bool=true;
  const params:any={};
  if(this.addServiceForm.value.serviceCategory){
    params.serviceCategory=this.addServiceForm.value.serviceCategory
  }
  if(this.addServiceForm.value.serviceSubCategory){
    params.serviceSubCategory=this.addServiceForm.value.serviceSubCategory
  }
  this.apiService.getScategory1(params).subscribe(
    (response) => {
      this.bool=false;
      this.serviceCategoryData = response.data;
    },
    (error) => {
      this.bool=false;
      console.error('Error fetching asset category data:', error);
    }
  );
}


onDropDownChange1(value:any){
  const params:any={};
    params.assetCat=value.target.value
  this.apiService.getAcategory1(params).subscribe((res:any)=>{
    if(res.status){
      const data = res.data;
      // this.assetCats = [...new Set(data.map((item:any) => item.assetCat))];
    this.serviceCategories = [...new Set(data.map((item:any) => item.assetSubCat))];
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
      this.serviceName = [...new Set(data.map((item:any) => item.serviceCategory))];

    }
  }
 
  );
}

editServiceCategory(assetId: string) {

  this.router.navigate(['dashboard/edit-service-category',assetId]);
}


}
