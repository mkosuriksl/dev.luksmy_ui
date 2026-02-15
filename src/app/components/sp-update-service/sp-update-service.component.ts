import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-sp-update-service',
  templateUrl: './sp-update-service.component.html',
  styleUrls: ['./sp-update-service.component.css'],
})
export class SpUpdateServiceComponent implements OnInit {
  @Input() data: any;
  subCategories: string[] = [];
  selectedCategoryServices: any[] = [];
  categoryServices: any[] = [];

  addServiceForm!: FormGroup;
  serviceId: string = '';
  subCategory: string = '';

  selection = new SelectionModel<any>(true, []);
  USER_SERVICES_ID = '';

  constructor(
    private apiService: ApiserviceService,
    private toast: ToastService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.addServiceForm = this.fb.group({
      subCategory: ['', Validators.required],
      experience: [this.data?.experience, Validators.required],
      charges: [this.data?.charge],
      availability: [this.data?.availableWithinRange, Validators.required],
      qualification: [this.data?.qualification, Validators.required],
      serviceId: [this.data?.userServicesId]
    });
    this.addServiceForm.get('subCategory')?.valueChanges.subscribe((selectedValue) => {
      console.log('Subcategory changed:', selectedValue);
      this.fetchCategoryServices(selectedValue);
    });
    
    this.getSubCategories();
    this.route.params.subscribe((params) => {
      this.subCategory = params['category'];

      forkJoin({
        // serviceDetails: this.showMyServiceByCategory(),
        serviceNames: this.getServicePersonUserService(this.data),
        // allServiceNames: this.adminServiceNamesGet()
      }).subscribe(({ serviceNames }) => {

        // const details = serviceDetails[0];
        // this.USER_SERVICES_ID = details.USER_SERVICES_ID;

        this.addServiceForm.patchValue({
          // subCategory: details.SERVICE_TYPE,
          // experience: Number(details.EXPERIENCE),
          // charges: '12356',
          // availability: details.AVAILABLE_WITHIN_RANGE,
          // qualification: details.QUALIFICATION,
        });

        this.selectedCategoryServices = serviceNames.getServiceId ? serviceNames.getServiceId : [];

        this.selection.clear();
        this.categoryServices = [];
        const selectedCategory = this.addServiceForm.get('subCategory')?.value ?? "";
        console.log('selected value : ', selectedCategory);

        if (selectedCategory) {
          this.apiService
            .getServiceData({ serviceSubCat: selectedCategory })
            .subscribe((res: any) => {
              this.categoryServices = res.data.filter((name: any) => name.serviceName !== null);
              console.log('categoryServices:', this.categoryServices); // Check the data
            });
        } else {
          this.categoryServices = [];
        }        


        // console.log(serviceIds);
        // const userServiceIds = serviceNames[0];
        // console.log(serviceDetails);
        // console.log(allServiceNames);
        // this.selectedCategoryServices = allServiceNames.data.map((obj: any) => ({service_id: obj.service_id, service_name: obj.service_name}));
        // const choosenServiceNames = this.selectedCategoryServices.filter(obj => serviceIds.includes(obj.service_id));


        // console.log(choosenServiceNames);
        // this.selection.select(...choosenServiceNames);

        // "service_id": "ME0001",
        // "service_name": "House Plumbing",

        // console.log('spServiceDetails', spServiceDetails);
        // console.log('spServices', spServices);
        // console.log('allServices', allServices);


      });
    });
  }
  fetchCategoryServices(selectedCategory: string) {
    if (!selectedCategory) {
      this.categoryServices = [];
      return;
    }
  
    this.apiService.getServiceData({ serviceSubCat: selectedCategory })
      .subscribe({
        next: (res: any) => {
          this.categoryServices = res.data.filter((name: any) => name.serviceName !== null);
          console.log('Fetched categoryServices:', this.categoryServices);
        },
        error: (err) => {
          console.error('Error fetching services:', err);
        }
      });
  }
  
  //Crate isSelected function to checked the check box of same serviceId as selected service
  isSelected(item: any): boolean {
    return this.selectedCategoryServices.some(
      (selectedItem) => selectedItem.serviceId === item.serviceId
    );
  }
  

  getSubCategories() {
    this.apiService.getScategory().subscribe((res: any) => {
      this.subCategories = res.data.map((category: any) => {
        return category.serviceSubCategory;
      });
      console.log('category', this.subCategories);
    });
  }

  @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>;
  onSubmit() {
    if (this.addServiceForm.valid) {
      const selectedServices = this.getSelectedServices();

      const data = {
        "userServicesId": this.addServiceForm.value.serviceId,
        "userId": localStorage.getItem('USER_ID'),
        "serviceType": this.addServiceForm.value.subCategory,
        "qualification": this.addServiceForm.value.qualification,
        "experience": this.addServiceForm.value.experience,
        "charge": this.addServiceForm.value.charges,
        "availableWithinRange": this.addServiceForm.value.availability,

      }

      this.apiService.putSpServicesData(data, 'USER_SERVICES_ID').subscribe(
        (response) => {
          if (response.status) {
            this.toast.show('Service Updated Successfully!');
            this.back.emit(false)
          } else {
            this.toast.show('Updating Service Failed !');
          }
        },
        (error) => {
          console.error('API error:', error);
        }
      );
    }
  }

  private UpdatespUserService(selectedServices: string[]) {
    const subCategory = this.addServiceForm.value.subCategory;

    return this.apiService
      .updateSpUserServices(selectedServices, subCategory);
  }

  getSelectedServices(): string[] {
    return this.selection.selected.map((item) => item.service_id);
  }

  showMyServiceByCategory(): Observable<any> {
    const subCategory = this.addServiceForm.value.subCategory;
    return this.apiService.showMyServicesBySubCategory(subCategory)
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }

  adminServiceNamesGet() {

    return this.apiService.getServiceNames(this.subCategory);
  }

  getServicePersonUserService(item: any) {
    let params: any = {};
    let user = localStorage.getItem('USER_ID')
    // params.userId=localStorage.getItem('USER_ID');
    params.bodSeqNo = user;
    params.userIdServiceId = item.userServicesId

    return this.apiService.getSpUserServicesName(params);
  }

  get allSelected(): boolean {
    return (
      this.selection.selected.length === this.categoryServices.length
    );
  }

  toggleMasterSelection() {
    if (this.allSelected) {
      this.selection.clear();
    } else {
      this.selection.select(...this.categoryServices);
    }
  }
}
