import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { EditServiceNameComponent } from '../edit-service-name/edit-service-name.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-show-service-name',
  templateUrl: './show-service-name.component.html',
  styleUrls: ['./show-service-name.component.css']
})
export class ShowServiceNameComponent implements OnInit{

  tableData: any[] = [];
  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 8;
  serviceCategories: any[] = [];
  addServiceForm!: FormGroup;
  bool=false;
  categories:any=[]



  constructor(private apiService: ApiserviceService,
    private dialog: MatDialog,private fb: FormBuilder
    ) {}


 ngOnInit(): void {
  this.addServiceForm = this.fb.group({
    subCategory: [''],
    category:[''],
    serviceName:[''],
    serviceId:['']
  });
  this.onDropDownChange()
  // this.getServiceCategories()
  // this.getTableData();
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
      this.categories = [...new Set(data.map((item:any) => item.serviceCategory))];

    }
  }
 
  );
}

search(){
  this.getTableData();
}
getServiceCategories() {
  this.apiService.getScategory().subscribe((res: any) => {
    this.serviceCategories = res.data.map((category: any) => category.serviceSubCategory);
    console.log("test");
    console.log(this.serviceCategories);

  });
}
openEditDialog(item: any) {
  const dialogRef = this.dialog.open(EditServiceNameComponent, {
    width: '600px',
    data: { item },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if(result) {
      
    }
    console.log('The dialog was closed');
   
  });
}
getTableData() {
  this.bool=true;
  const params:any={};
  if(this.addServiceForm.value.subCategory){
    params.serviceSubCat=this.addServiceForm.value.subCategory
  }
  if(this.addServiceForm.value.serviceName){
    params.serviceName=this.addServiceForm.value.serviceName
  }
  if(this.addServiceForm.value.serviceId){
    params.serviceId=this.addServiceForm.value.serviceId
  }
  this.apiService.getServiceData(params).subscribe(
    (response: any) => {
      this.bool=false;
      this.tableData = response.data;
      this.totalLength = this.tableData.length;
    },
    (error) => {
      this.bool=false;
      console.error('Error fetching service data:', error);
    }
  );
}


 get pagedData(): any[] {
  const start = this.page * this.totalLength;
  const end = start + this.totalLength;
  return this.tableData.slice(start, end);
}

}
