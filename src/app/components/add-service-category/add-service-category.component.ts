import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-add-service-category',
  templateUrl: './add-service-category.component.html',
  styleUrls: ['./add-service-category.component.css']
})
export class AddServiceCategoryComponent {
  constructor(private apiService: ApiserviceService,private toast: ToastService) {}

  addServiceCategoryForm = new FormGroup({

    category: new FormControl('',Validators.required),
    subcategory: new FormControl('',Validators.required),

  });

  addServiceCategorySubmit(){
    const addServices: any = {
      serviceCategory: this.addServiceCategoryForm.value.category ?? "",
      serviceSubCategory: this.addServiceCategoryForm.value.subcategory ?? "",
      addedBy: "admin",
    }

    this.apiService.addServiceCategory(addServices).subscribe(
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
