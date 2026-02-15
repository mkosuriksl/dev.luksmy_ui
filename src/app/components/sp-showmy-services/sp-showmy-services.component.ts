import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ServiceDetailsModalComponent } from 'src/app/service-details-modal/service-details-modal.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-sp-showmy-services',
  templateUrl: './sp-showmy-services.component.html',
  styleUrls: ['./sp-showmy-services.component.css']
})
export class SpShowmyServicesComponent implements OnInit{
  subCategories:any[]=[]
  myServices: any[] = [];
  editMode:boolean=false;
  addServiceForm!: FormGroup;
  selectedCategoryServices: any[] = [];
  selection = new SelectionModel<any>(true, []);
  bool=false;

  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 5;
  data:any;
  category: any;

  constructor(private apiService: ApiserviceService, private router: Router,
     private fb: FormBuilder,private toast:ToastService ,private dialog:MatDialog) {}

  ngOnInit(): void {
    this.getSubCategories()
    this.getUserServices(this.category);
    this.addServiceForm = this.fb.group({
      subCategory: [''],
    });
  }
  get pagedData(): any[] {
    const start = (this.page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.myServices.slice(start, end);
  }

  onRecordsPerPageChange(event: Event) {
    this.itemsPerPage = +(event.target as HTMLSelectElement).value;
    this.page = 1; 
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

getUserServices(selectedCategory:any) {
  const userId = localStorage.getItem("USER_ID") ?? "";
  this.apiService.showMyServices(selectedCategory).subscribe((response: any) => {
   
    this.myServices = response.data || [];
    // Set totalLength for pagination
    this.totalLength = this.myServices.length;
  });
}

onServiceSelectionChange() {
  this.bool=true;
  const userId = localStorage.getItem("USER_ID") ?? "";
  const params:any={};
  params.userId= userId ;

  this.selection.clear();
  this.selectedCategoryServices = [];
  const selectedCategory = this.addServiceForm.get('subCategory')?.value ?? "";
  console.log('selected value : ', selectedCategory);
  // this.getUserServices(selectedCategory);

  if (selectedCategory) {
    const servSubCat = selectedCategory;
    params.serviceType=servSubCat;
    this.apiService
      .getServiceNames(params)
      .subscribe((res: any) => {
        console.log(res);
        // this.selectedCategoryServices = res.data ? res.data : [];
        if(res.data.length==0 || res.data==null ){
          this.bool=false;
          console.log('no data ')
          this.toast.show(res.message,3000)
        }
        this.bool=false;
        this.myServices=res.data;
        console.log(this.selectedCategoryServices);
      });
  } else {
    this.bool=false;
    this.selectedCategoryServices = [];
  }
}
back(value:any){
  this.editMode=value;
  this.onServiceSelectionChange()
}

onEdit(id: any) {
  

  this.data = id
  

  this.editMode=true;


}


openDetails(item:any){
  console.log(item)
  let params:any={};
  let user=localStorage.getItem('USER_ID')
  // params.userId=localStorage.getItem('USER_ID');
  params.bodSeqNo=user;
  params.userIdServiceId=item.userServicesId
  this.apiService.getSpUserServicesName(params).subscribe((res)=>{
    console.log(res)
    this.dialog.open(ServiceDetailsModalComponent, {
      width: '400px',
      data: {
        serviceType: item.serviceType,
        qualification: item.qualification,
        experience: item.experience,
        pincode: item.pincode,
        city: item.city,
        subServices: res.getServiceId 
      }
    });
  }
  )
}


}
