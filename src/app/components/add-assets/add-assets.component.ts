import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast } from 'ngx-toastr';
import { addAssetsData } from 'src/app/interfaces/addAssets.modal';
import { updateProfile } from 'src/app/interfaces/updateProfile.modal';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-add-assets',
  templateUrl: './add-assets.component.html',
  styleUrls: ['./add-assets.component.css']
})
export class AddAssetsComponent implements OnInit {
  assetCats: any[] = [];
  assetSubCats: any[] = [];
  assetModels: any[] = [];
  assetBrands: any[] = [];

  selectedAssetCat: any = '';
  selectedAssetSubCat: any = '';
  selectedAssetModel: any = '';
  selectedAssetBrand: any = '';
  choosenLocation = "";

  constructor(private apiService: ApiserviceService,private toast: ToastService,private router:Router) {
   
  }

  ngOnInit(): void {
      this.onDropDownChange();
   
  }
  addAssetsForm = new FormGroup({
    assetsCategory: new FormControl(localStorage.getItem('serviceCategory'),Validators.required),
    assetsSubCategory: new FormControl('',Validators.required),
    location: new FormControl('',Validators.required),
    street: new FormControl('',Validators.required),
    doornumber: new FormControl('',Validators.required),
    town: new FormControl('',Validators.required),
    district: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    pincode: new FormControl('',Validators.required),
    assetBrand: new FormControl('',Validators.required),
    assetModel: new FormControl('',Validators.required),

  });

  options: any = {
    componentRestrictions: { country: 'IN' }
  }

  addAssetsSubmit(){
    const userId = localStorage.getItem('USER_ID') ?? "";
    const addAssets: any = {
      assetCat: this.addAssetsForm.value.assetsCategory ?? "",
      assetSubCat: this.addAssetsForm.value.assetsSubCategory ?? "",
      location: this.choosenLocation.replace(/\s+/g, ''),
      street: this.addAssetsForm.value.street ?? "",
      doorNo: this.addAssetsForm.value.doornumber ?? "",
      town: this.addAssetsForm.value.town ?? "",
      district: this.addAssetsForm.value.district ?? "",
      state: this.addAssetsForm.value.state ?? "",
      pinCode: this.addAssetsForm.value.pincode ?? "",
      assetBrand:this.addAssetsForm.value.assetBrand ?? "",
      assetModel:this.addAssetsForm.value.assetModel ?? ""
    }
    this.apiService.addSpAsset(userId, addAssets).subscribe(
      (response) => {
        console.log(response);
        if (response.status) {
          this.toast.show('Asset added successfully!');
          this.router.navigateByUrl('sp-dashboard/edit-assets');
          
        } else {
          this.toast.show('Failed to add asset. Please try again.');
        }
      },
      (error) => {
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
    params.assetCat=localStorage.getItem('serviceCategory');
    this.apiService.getAcategory1(params).subscribe((res:any)=>{
      if(res.status){
        const data = res.data;
        // this.assetCats = [...new Set(data.map((item:any) => item.assetCat
      this.assetSubCats = data.map((item:any) => item.assetSubCat)
      this.assetModels = data.map((item:any) => item.assetModel)
      this.assetBrands = data.map((item:any) => item.assetBrand)
      }
    }
   
    );
  }

  }

