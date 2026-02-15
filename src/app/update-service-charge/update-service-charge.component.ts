import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from '../services/apiservice/apiservice.service';
import { ToastService } from '../services/toast/toast.service';

@Component({
  selector: 'app-update-service-charge',
  templateUrl: './update-service-charge.component.html',
  styleUrls: ['./update-service-charge.component.css']
})
export class UpdateServiceChargeComponent {
  
  assetCats: any[] = [];
  assetSubCats: any[] = [];
  assetModels: any[] = [];
  assetBrands: any[] = [];

  selectedAssetCat: any = '';
  selectedAssetSubCat: any = '';
  selectedServiecId: any = '';
  selectedAssetModel: any = '';
  selectedAssetBrand: any = '';
  choosenLocation = "";
  sserviceId: any;
  serviceCategory:any='';
  addAssetsForm!: FormGroup<any>;
  @Input() data:any;
  @Output() back:EventEmitter<boolean>=new EventEmitter<boolean>;
  constructor(private apiService: ApiserviceService,private toast: ToastService) {
    this.serviceCategory=localStorage.getItem('serviceCategory');
  }


  ngOnInit(): void {

    this.serviceCategory=localStorage.getItem('serviceCategory');
      this.onDropDownChange();
   console.log(this.data);
      this.addAssetsForm = new FormGroup({
        serviceCategory: new FormControl('',Validators.required),
        serviceCharge: new FormControl(this.data?.serviceCharge,Validators.required),
        location: new FormControl(this.data?.location,Validators.required),
        updatedBy: new FormControl('',Validators.required),
        brand: new FormControl(this.data?.brand,Validators.required),
        model: new FormControl(this.data?.model,Validators.required),
        subcategory: new FormControl(this.data?.subCategory,Validators.required),
        bodSeqNo: new FormControl('',Validators.required),
        serviceId: new FormControl(this.data?.serviceId,Validators.required),
        serviceChargeKey:new FormControl(this.data?.serviceChargeKey)
      });
      this.selectedAssetModel=this.data?.model
      this.selectedAssetSubCat=this.data?.subcategory
      this.selectedAssetBrand=this.data?.brand
  }
 

  options: any = {
    componentRestrictions: { country: 'IN' }
  }

  addAssetsSubmit(){
    const userId = localStorage.getItem('USER_ID') ?? "";
    let addAssets: any = {
        
            
                serviceId: this.data.serviceId,
                serviceCharge:this.addAssetsForm.value.serviceCharge,
                location:this.choosenLocation==""?this.addAssetsForm.value.location:this.choosenLocation.replace(/\s+/g, ''),
                updatedBy: localStorage.getItem('username'),
                brand: this.addAssetsForm.value.brand,
                model: this.addAssetsForm.value.model,
                subcategory: this.addAssetsForm.value.subcategory,
                bodSeqNo:localStorage.getItem('USER_ID'),
                serviceChargeKey:this.data.serviceChargeKey
            }
        
       
    
    this.apiService.updateCharge(addAssets).subscribe(
      (response:any) => {
        console.log(response);
        if (response.status) {
          this.toast.show('Service Charge updated successfully!');
          this.back.emit(false);
        } else {
          this.toast.show('Failed to update Service Charge. Please try again.');
        }
      },
      (error:any) => {
        console.error(error);
        this.toast.show('An error occurred while adding the asset.');
      }
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
