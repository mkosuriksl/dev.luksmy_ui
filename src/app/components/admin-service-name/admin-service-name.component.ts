import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-admin-service-name',
  templateUrl: './admin-service-name.component.html',
  styleUrls: ['./admin-service-name.component.css']
})
export class AdminServiceNameComponent implements OnInit{

  serviceCategories: any[] = [];
  serviceSubCategories: any[] = [];
  serviceCategoriesAndSubcateries: any = {}
  constructor(private apiService: ApiserviceService,private toast: ToastService) {}

  ngOnInit() {
    this.loadServiceCategories();
  }

  addServiceNameForm = new FormGroup({

    serviceId: new FormControl('',Validators.required),
    subCategory: new FormControl('',Validators.required),
    serviceName: new FormControl('',Validators.required),
    addedBy: new FormControl('',Validators.required),



  });


  loadServiceCategories() {
    this.apiService.getScategory().subscribe(
      (response: any) => {
        console.log("11111111111111111111");
        console.log(response);

        // Check if response is an array before using reduce
        if (Array.isArray(response.data)) {
          // Transform the response data into key-value pairs
          const categoryMap: { [key: string]: string[] } = response.data.reduce((result: { [key: string]: string[] }, item: any) => {
            const category = item.serviceCategory;
            const subCategory = item.serviceSubCategory;

            if (!result[category]) {
              result[category] = [];
            }

            if (subCategory) {
              result[category].push(subCategory);
            }

            return result;
          }, {});

          // Assign the key-value pairs to your component property
          this.serviceCategoriesAndSubcateries = categoryMap;
          this.serviceCategories = Object.keys(categoryMap);



        } else {
          console.error('Response is not an array:', response);
          this.toast.show('Failed to load Service Categories');
        }

        // Assuming response.data is an array, you can assign it to serviceCategories
      },
      (error) => {
        console.error(error);
        this.toast.show('Failed to load Service Categories');
      }
    );
  }






  onServiceCategoryChange() {
    // Assuming selectedServiceCategory is the key you want to retrieve
    const selectedServiceCategory = this.addServiceNameForm.value.serviceId ?? "";
    this.serviceSubCategories = this.serviceCategoriesAndSubcateries[selectedServiceCategory] || [];
  }




  addServiceNameSubmit() {

    

    const serviceId = this.addServiceNameForm.value.serviceId ?? "";
    const subCategory = this.addServiceNameForm.value.subCategory ?? "";
    const serviceName = this.addServiceNameForm.value.serviceName ?? "";
    const addedBy = localStorage.getItem('username') ?? "";

    this.apiService.addServiceName(serviceId, subCategory,serviceName, addedBy,).subscribe(
      (response) => {
        console.log(response);
        this.toast.show(response.message);
      },
      (error) => {
        console.error(error);
        this.toast.show('Failed to add Service Name');
      }
    );
  }

}
