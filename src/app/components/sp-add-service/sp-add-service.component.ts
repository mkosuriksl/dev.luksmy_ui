import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { forkJoin } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-sp-add-service',
  templateUrl: './sp-add-service.component.html',
  styleUrls: ['./sp-add-service.component.css'],
})
export class SpAddServiceComponent implements OnInit {
  subCategories: string[] = [];
  selectedCategoryServices: any[] = [];
  addServiceForm!: FormGroup;
  selectedServices: any[] = [];
  selection = new SelectionModel<any>(true, []);
  scategory!: any;
  constructor(
    private apiService: ApiserviceService,
    private fb: FormBuilder,
    private toast: ToastService
  ) {
    this.addServiceForm = this.fb.group({
      subCategory: [''],
      experience: ['', Validators.required],
      charges: ['', Validators.required],
      availability: ['', Validators.required],
      qualification: ['', Validators.required],
      pincode: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.scategory = localStorage.getItem('serviceCategory')
    this.getSubCategories();
    this.onServiceSelectionChange();
  }

  getSubCategories() {

    this.apiService.getScategory().subscribe((res: any) => {
      this.subCategories = res.data.map((category: any) => {
        return category.serviceSubCategory;
      });
    });
  }
  onSubmit() {
    if (this.addServiceForm.valid) {
      const userId = localStorage.getItem('USER_ID') || '';
      const data = {
        userId: userId,
        availableWithinRange: this.addServiceForm.value.availability,
        charge: this.addServiceForm.value.charges,
        experience: this.addServiceForm.value.experience,
        qualification: this.addServiceForm.value.qualification,
        serviceType: this.addServiceForm.value.subCategory,
        pincode: this.addServiceForm.value.pincode,
      };

      const postSpServiceData$ = this.apiService.postSpServiceData(data);
      const addSpUserServices$ = this.spUserServices();

      forkJoin([postSpServiceData$, addSpUserServices$])
        .pipe(
          catchError((error) => {
            console.error('Error in forkJoin:', error);

            return [];
          }),
          finalize(() => {

            console.log('Both requests completed.');
          })
        )
        .subscribe(
          ([postSpServiceDataResponse, addSpUserServicesResponse]) => {
            if (postSpServiceDataResponse.status && addSpUserServicesResponse.status) {
              this.toast.show('Service Added Successfully!');
              this.addServiceForm.reset();
            } else {

              if (!postSpServiceDataResponse.status) {
                this.toast.show('Adding Service Failed: ' + postSpServiceDataResponse.message);
              } else if (!addSpUserServicesResponse.status) {
                this.toast.show('Adding Service Failed: ' + addSpUserServicesResponse.message);
              }
            }
          }
        );
    }
  }

  spUserServices() {
    console.log(this.selection, 'hfh')
    const selectedServices = this.selection.selected.map(
      (item) => item.serviceId

    );

    const subCategory = this.addServiceForm.value.subCategory ?? "";
    console.log('SubCategory for addSpUserServices:', subCategory);

    return this.apiService.addSpUserServices(
      selectedServices,
      subCategory,
    );
  }


  onServiceSelectionChange() {
    this.selection.clear();
    this.selectedCategoryServices = [];
    const selectedCategory = this.addServiceForm.get('subCategory')?.value ?? "";
    console.log('selected value : ', selectedCategory);

    if (selectedCategory) {
      const servSubCat = selectedCategory;
      const params: any = {};
      params.serviceSubCat = servSubCat;

      this.apiService
        .getServiceData(params)
        .subscribe((res: any) => {
          console.log(res);
          this.selectedCategoryServices = res.data.filter((name: any) => name.serviceName !== null);
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

  toggleMasterSelection() {
    if (this.allSelected) {
      this.selection.clear();
    } else {
      this.selection.select(...this.selectedCategoryServices);
      console.log(this.selection, 'selection', this.selectedCategoryServices)
    }
  }
}
