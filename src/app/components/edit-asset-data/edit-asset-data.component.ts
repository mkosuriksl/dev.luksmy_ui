import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-edit-asset-data',
  templateUrl: './edit-asset-data.component.html',
  styleUrls: ['./edit-asset-data.component.css']
})
export class EditAssetDataComponent {
  addAssetsForm!:FormGroup;
  assetCats: any[] = [];
  assetSubCats: any[] = [];
  assetModels: any[] = [];
  assetBrands: any[] = [];

  selectedAssetCat: any = '';
  selectedAssetSubCat: any = '';
  selectedAssetModel: any = '';
  selectedAssetBrand: any = '';
  constructor(private apiService: ApiserviceService,private toast: ToastService,public dialogRef: MatDialogRef<EditAssetDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {console.log(data,'dsdd')}
  ngOnInit(): void {
    this.onDropDownChange();
    this.addAssetsForm = new FormGroup({
      assetsCategory: new FormControl(this.data.item.assetCat,Validators.required),
      assetsSubCategory: new FormControl(this.data.item.assetSubCat,Validators.required),
      location: new FormControl(this.data.item.location,Validators.required),
      street: new FormControl(this.data.item.street,Validators.required),
      doornumber: new FormControl(this.data.item.doorNo,Validators.required),
      town: new FormControl(this.data.item.town,Validators.required),
      district: new FormControl(this.data.item.district,Validators.required),
      state: new FormControl(this.data.item.state,Validators.required),
      pincode: new FormControl(this.data.item.pinCode,Validators.required),
      assetBrand: new FormControl(this.data.item.assetBrand,Validators.required),
      assetModel: new FormControl(this.data.item.assetModel,Validators.required),
    });
}
onDropDownChange(){
  this.apiService.getAcategory().subscribe((res:any)=>{
    if(res.status){
      const data = res.data;
      this.assetCats = [...new Set(data.map((item:any) => item.assetCat))];
    this.assetSubCats = [...new Set(data.map((item:any) => item.assetSubCat))];
    this.assetModels = [...new Set(data.map((item:any) => item.assetModel))];
    this.assetBrands = [...new Set(data.map((item:any) => item.assetBrand))];
    }
  }
 
  );
}
addAssetsSubmit(){
  const userId = localStorage.getItem('USER_ID') ?? "";
  const addAssets: any = {
    userId:userId,
    assetId:this.data.item.assetId,
    assetCat: this.addAssetsForm.value.assetsCategory ?? "",
    assetSubCat: this.addAssetsForm.value.assetsSubCategory ?? "",
    location:this.addAssetsForm.value.location ?? "",
    street: this.addAssetsForm.value.street ?? "",
    doorNo: this.addAssetsForm.value.doornumber ?? "",
    town: this.addAssetsForm.value.town ?? "",
    district: this.addAssetsForm.value.district ?? "",
    state: this.addAssetsForm.value.state ?? "",
    pinCode: this.addAssetsForm.value.pincode ?? "",
    assetBrand:this.addAssetsForm.value.assetBrand ?? "",
    assetModel:this.addAssetsForm.value.assetModel ?? ""
  }
  this.apiService.editAsset(addAssets).subscribe(
    (response) => {
      console.log(response);
      if (response.status) {
        this.toast.show(response.message);
        this.dialogRef.close()
      } else {
        this.toast.show(response.message);
      }
    },
    (error) => {
      console.error(error);
      this.toast.show('An error occurred while adding the asset.');
    }
  );
}

}
