import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from '../services/apiservice/apiservice.service';
import { ToastService } from '../services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-service-charges',
  templateUrl: './add-service-charges.component.html',
  styleUrls: ['./add-service-charges.component.css']
})
export class AddServiceChargesComponent {
  assetCats: any[] = [];
  assetSubCats: any[] = [];
  assetModels: any[] = [];
  assetBrands: any[] = [];
  selectedCategoryServices: any[] = [];
  selection = new SelectionModel<any>(true, []);
  selectedAssetCat: any = '';
  selectedAssetSubCat: any = '';
  selectedServiecId: any = '';
  selectedAssetModel: any = '';
  selectedAssetBrand: any = '';
  choosenLocation = "";
  sserviceId: any;
  charges:any={};
  serviceCategory:any='';
  addAssetsForm!: FormGroup<any>;
  constructor(private apiService: ApiserviceService,private toast: ToastService,private router:Router) {
    this.serviceCategory=localStorage.getItem('serviceCategory');
  }


  ngOnInit(): void {

    this.serviceCategory=localStorage.getItem('serviceCategory');
      this.onDropDownChange();
   
      this.addAssetsForm = new FormGroup({
        serviceCategory: new FormControl(localStorage.getItem('serviceCategory'),Validators.required),
        serviceCharge: new FormControl('',Validators.required),
        location: new FormControl('',Validators.required),
        updatedBy: new FormControl('',Validators.required),
        brand: new FormControl('',Validators.required),
        model: new FormControl('',Validators.required),
        subcategory: new FormControl('',Validators.required),
        bodSeqNo: new FormControl('',Validators.required),
        serviceId: new FormControl('',Validators.required),
      });
  }
 

  options: any = {
    componentRestrictions: { country: 'IN' }
  }

  addAssetsSubmit(){
let tempCharges=this.selection.selected.map((ele)=>{
   let obj={
                serviceId: ele.serviceId,
                serviceCharge:this.charges[ele.serviceId],
                location:this.choosenLocation.replace(/\s+/g, ''),
                updatedBy: localStorage.getItem('username'),
                brand: this.addAssetsForm.value.brand,
                model: this.addAssetsForm.value.model,
                bodSeqNo:localStorage.getItem('USER_ID'),
            }
            return {...obj}
})
    
    let addAssets: any = {
        chargesList: tempCharges,
        subCategory: this.addAssetsForm.value.subcategory,
    }
    this.apiService.addCharge(addAssets).subscribe(
      (response) => {
        if (response.status) {
          this.toast.show('Service Charge added successfully!');
          this.addAssetsForm.reset()
          this.router.navigateByUrl("sp-dashboard/show-service-charge");
        } else {
          this.toast.show('Failed to add Service Charge. Please try again.');
        }
      },
      (error) => {
        console.error(error);
        this.toast.show('An error occurred while adding the asset.');
      }
    );
  }

  toggleMasterSelection() {
 
    if (this.allSelected) {
      this.selection.clear();
    } else {
      this.selection.select(...this.selectedCategoryServices);
      console.log(this.selection,'selection',this.selectedCategoryServices)
    }
  }
  selectService(item:any){
this.selection.toggle(item)
  }

  addCharges(e:any,item:any){
    this.charges[item['serviceId']]=e.target.value;
    console.log(this.charges)
  }
  
  onServiceSelectionChange(value:any) {

    this.selection.clear();
    this.selectedCategoryServices = [];
    const selectedCategory = value.target.value
    console.log('selected value : ', selectedCategory);

    if (selectedCategory) {
      const servSubCat = selectedCategory;
      const params:any={};
      params.serviceSubCat=servSubCat;

      this.apiService
        .getServiceData(params)
        .subscribe((res: any) => {
          console.log(res);
          this.selectedCategoryServices = res.data.filter((name:any) => name.serviceName !== null);
         // this.selectedCategoryServices = res.data.map((item:any) => item.serviceName).filter((name:any) => name !== null);
          console.log(this.selectedCategoryServices);
        });
    } else {
      this.selectedCategoryServices = [];
    }
  }

  get allSelected(): boolean {
    return (
      this.selection.selected.length === this.selectedCategoryServices.length
    );
  }
  public handleAddressChange(place: google.maps.places.PlaceResult) {
    console.log(place.formatted_address);
    this.choosenLocation = place.formatted_address ?? "";
  }
  onDropDownChange(){
    const params:any={};
    params.assetCat=this.serviceCategory;
    this.apiService.getAcategory1(params).subscribe((res:any)=>{
      if(res.status){
        const data = res.data;
        // this.assetCats = [...new Set(data.map((item:any) => item.assetCat))];
      this.assetSubCats = data.map((item:any) => item.assetSubCat)
      console.log(this.assetSubCats);
      this.assetModels = data.map((item:any) => item.assetModel)
      this.assetBrands = data.map((item:any) => item.assetBrand)
      }
    }
   
    );
  }
  getSubCategories() {
    let params:any={};
    params.serviceType=localStorage.getItem('serviceCategory');
    params.userId=localStorage.getItem('USER_ID');
    this.apiService.getServiceNames(params).subscribe((res: any) => {
      this.sserviceId = res.data.map((category: any) => {
        return category.userServicesId;
      });
    });
  }
 
}


