import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-edit-service-category',
  templateUrl: './edit-service-category.component.html',
  styleUrls: ['./edit-service-category.component.css']
})
export class EditServiceCategoryComponent {
  constructor(private apiService: ApiserviceService,
    private toast: ToastService,
    private route: ActivatedRoute) {}

    assetId: string = '';
    appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';

    addServiceCategoryForm = new FormGroup({
      category: new FormControl('', Validators.required),
      subcategory: new FormControl('', Validators.required),
      addedby: new FormControl('', Validators.required),
    });

    ngOnInit() {
      this.route.params.subscribe((params) => {
        this.assetId = params['id'];
        this.fetchServiceCategoryDetails();
      });
    }

    editServiceCategoryForm() {
      const editServiceCategory: any = {
        id: this.assetId,
        serviceCategory: this.addServiceCategoryForm.value.category,
        serviceSubCategory: this.addServiceCategoryForm.value.subcategory,
        updateBy: "admin"
      };

      this.apiService.editServiceCategory(editServiceCategory).subscribe(
        (response) => {
          console.log(response);
          if (response.status) {
            this.toast.show('Service Category Updated successfully!');
          } else {
            this.toast.show('Failed to Update Asset Category. Please try again.');
          }
        },
        (error) => {
          console.error(error);
          this.toast.show('An error occurred while updating the asset category.');
        }
      );

  }

fetchServiceCategoryDetails() {
       this.apiService.getServiceCategoryDetails(this.assetId).subscribe(
             (data) => {
            const serviceCategoryDetails = data.data[0];
            this.addServiceCategoryForm.patchValue({
            category: serviceCategoryDetails.serviceCategory,
            subcategory: serviceCategoryDetails.serviceSubCategory,
            addedby: serviceCategoryDetails.addedBy
            });
           },
           (error) => {
             console.error('Error fetching asset category details:', error);
            }
          );
       }

}
