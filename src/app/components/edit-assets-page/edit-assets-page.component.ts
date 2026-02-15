import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Toast } from 'ngx-toastr';
import { take } from 'rxjs';
import { addAssetsData } from 'src/app/interfaces/addAssets.modal';
import { updateProfile } from 'src/app/interfaces/updateProfile.modal';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-edit-assets-page',
  templateUrl: './edit-assets-page.component.html',
  styleUrls: ['./edit-assets-page.component.css']
})
export class EditAssetsPageComponent implements OnInit{

  assetId: string = '';
  @Input() data:any={};
  editAssetsForm!:FormGroup;
  appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
  userId =  localStorage.getItem('USER_ID') ?? "";
  assetSubCats: any;
  assetModels: any;
  assetBrands: any;
  choosenLocation: string="";
  options: any = {
    componentRestrictions: { country: 'IN' }
  }
  @Output() back:EventEmitter<boolean>=new EventEmitter<boolean>;

  constructor(private apiService: ApiserviceService,
              private toast: ToastService,
              private route: ActivatedRoute,
              private fb :FormBuilder
              ) {
                this.onDropDownChange()
              }

  

  ngOnInit() {
    console.log(this.data)
    this.editAssetsForm = this.fb.group({
      assetCat: new FormControl(this.data?.assetCat,Validators.required),
      assetSubCat: new FormControl(this.data?.assetSubCat,Validators.required),
      location: new FormControl(this.data?.location,Validators.required),
      street: new FormControl(this.data?.street,Validators.required),
      doorNo: new FormControl(this.data?.doorNo,Validators.required),
      town: new FormControl(this.data?.town,Validators.required),
      district: new FormControl(this.data?.district,Validators.required),
      state: new FormControl(this.data?.state,Validators.required),
      pinCode: new FormControl(this.data?.pinCode,Validators.required),
      assetId:new FormControl(this.data?.assetId,Validators.required),
      assetModel:new FormControl(this.data?.assetModel,Validators.required),
      assetBrand:new FormControl(this.data?.assetBrand,Validators.required),
      userId:new FormControl(this.data?.userId,Validators.required),
    });
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

  public handleAddressChange(place: google.maps.places.PlaceResult) {
    console.log(place.formatted_address);
    this.choosenLocation = place.formatted_address ?? "";
  }
  editAssetsSubmit(){
    this.apiService.editSpAsset(this.editAssetsForm.value).subscribe(
      (response) => {
        console.log(response);
        if (response.status) {
          this.toast.show('Asset updated successfully!');
           this.back.emit(false);
          
        } else {
          this.toast.show('Failed to update asset. Please try again.');
        }
      },
      (error) => {
        console.error(error);
        this.toast.show('An error occurred while adding the asset.');
      }
    );
  }
  backk(){
    this.back.emit(false);
  }

}
