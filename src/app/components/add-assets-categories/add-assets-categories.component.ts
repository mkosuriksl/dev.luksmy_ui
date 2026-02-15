import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addAssetsData } from 'src/app/interfaces/addAssets.modal';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-add-assets-categories',
  templateUrl: './add-assets-categories.component.html',
  styleUrls: ['./add-assets-categories.component.css']
})
export class AddAssetsCategoriesComponent {

  constructor(private apiService: ApiserviceService,private toast: ToastService) {}

  addAssetsCategoryForm = new FormGroup({

    category: new FormControl('',Validators.required),
    subcategory: new FormControl('',Validators.required),
    assetBrand: new FormControl('',Validators.required),
    assetmodel: new FormControl('',Validators.required)


  });

  addAssetsCategorySubmit(){
  
    const addAssets: any = {
      assetCat: this.addAssetsCategoryForm.value.category ?? "",
      assetSubCat: this.addAssetsCategoryForm.value.subcategory ?? "",
      addedBy: "admin",
      assetModel:this.addAssetsCategoryForm.value.assetmodel ?? "",
      assetBrand:this.addAssetsCategoryForm.value.assetBrand ?? "",
    }

    this.apiService.addAssetsCategory(addAssets).subscribe(
      (response) => {
        console.log(response);
        if (response.status) {
          this.toast.show(response.message);
        } else {
          this.toast.show(response.message);
        }
      },
      (error) => {
        console.error(error);
        this.toast.show('An error occurred while adding the category.');
      }
    );

  }

}
