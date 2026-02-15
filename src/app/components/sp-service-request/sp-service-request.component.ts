import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-sp-service-request',
  templateUrl: './sp-service-request.component.html',
  styleUrls: ['./sp-service-request.component.css']
})
export class SpServiceRequestComponent implements OnInit{
  tableData: any[] = [];
  totalLength: number = 0;
  page: number = 1;
  itemsPerPage: number = 5;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  choosenLocation = "";
  subCategories: string[] = [];
  bool=false;
  sCategory!:any;
  serviceRequestForm = new FormGroup({
    serviceCategory: new FormControl(''),
    serviceName: new FormControl(''),
    location: new FormControl(''),
    email: new FormControl(''),
    requestStatus: new FormControl(''),
    phoneNo: new FormControl(''),
    assetId: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    status:new FormControl(''),
  });
  assetIds: any;


  constructor(private apiService: ApiserviceService,
              ) {}

  ngOnInit(): void {
    this.getMaterialData();
    this.sCategory=localStorage.getItem('serviceCategory')
    this.serviceRequestData();
    this.getSubCategories();
    const userId =  localStorage.getItem('USER_ID') ?? "";
    const params:any={}
    params.userId=userId;
    this.apiService.getAssetData(params).subscribe((response) => {
      console.log("*****123");
      console.log(response);
      if (response.status) {
 
        this.assetIds = response.data.map((obj:any) => obj?.assetId);
   

      }
    })

 }
 options: any = {
  componentRestrictions: { country: 'IN' }
}

sortData(column: string): void {
  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }

  this.tableData.sort((a: any, b: any) => {
    const valA = new Date(a[column]).getTime();
    const valB = new Date(b[column]).getTime();

    if (this.sortDirection === 'asc') {
      return valA - valB;
    } else {
      return valB - valA; 
    }
  });
}

 get pagedData(): any[] {
  const start = this.page * this.totalLength;
  const end = start + this.totalLength;
  return this.tableData.slice(start, end);
}



serviceRequestData() {
  this.bool = true;
  this.tableData = [];
  const params: any = {};

  if (this.serviceRequestForm.value?.email) params.email = this.serviceRequestForm.value?.email;
  if (this.serviceRequestForm.value?.phoneNo) params.mobile = this.serviceRequestForm.value?.phoneNo;
  if (this.serviceRequestForm.value?.fromDate) params.fromDate = this.serviceRequestForm.value?.fromDate;
  if (this.serviceRequestForm.value?.toDate) params.toDate = this.serviceRequestForm.value?.toDate;
  if (this.serviceRequestForm.value?.assetId) params.assetId = this.serviceRequestForm.value?.assetId;
  if (this.serviceRequestForm.value?.status) params.status = this.serviceRequestForm.value?.status;
  if (this.serviceRequestForm.value?.location) params.location = this.choosenLocation?.replace(/\s+/g, '');

  this.apiService.getEcServiceRequestData(params).subscribe((res: any) => {
    this.bool=false;
        this.tableData = res.data.sort((a: any, b: any) => {
          const dateA = new Date(a.serviceRequestDate);
          const dateB = new Date(b.serviceRequestDate);
          return dateB.getTime() - dateA.getTime(); // For descending order
    });

  });
}
search(){
  this.serviceRequestData();
}
public handleAddressChange(place: google.maps.places.PlaceResult) {
  console.log(place.formatted_address);
  this.choosenLocation = place.formatted_address ?? "";
}
getSubCategories() {
  let params:any={};
  params.serviceType=localStorage.getItem('serviceCategory');
  params.userId=localStorage.getItem('USER_ID');
  this.apiService.getServiceNames(params).subscribe((res: any) => {
    this.subCategories = res.data.map((category: any) => {
      return category.serviceType;
    });
    console.log('category', this.subCategories);
  });
}
onRecordsPerPageChange(event: Event) {
  this.itemsPerPage = +(event.target as HTMLSelectElement).value;
  this.page = 1; 
}

records: any[] = [];
  filteredRecordsList: any[] = [];

  selectedImages: any[] = [];
  selectedSkuId: string | null = null;

  filter = {
    serviceId: '',
    model: '',
    brand: 'Honda1',
    requestId: '',
    contactNumber: '',
    vehicleId: '',
    toRequestDate: '',
    fromRequestDate: '',
    status: '',
  };

  isSearched = false;

  getMaterialData() {
    this.apiService.getAdminMaterialMaster().subscribe((data: any) => {
      if (data) {
        this.records = data.getAdminMaterialMaster || [];
      }
    });
  }

  submitSearch() {
    this.isSearched = true;

    const userId = localStorage.getItem('USER_ID') || '';

    const filterWithUser = {
      ...this.filter,
    };

    this.apiService
      .getUserServiceChargs(filterWithUser)
      .subscribe((data: any) => {
        if (data) {
          this.filteredRecordsList = data.items[0].serviceRequestDetails || [];
        }        
      });
  }

  resetFilters() {
    this.filter = {
      serviceId: '',
      model: '',
      brand: '',
      requestId: '',
      contactNumber: '',
      vehicleId: '',
      toRequestDate: '',
      fromRequestDate: '',
      status: '',
    };

    this.isSearched = false;
    this.filteredRecordsList = [];
  }

  uniqueValues(field: string) {
    return [...new Set(this.records.map((rec) => rec[field]).filter(Boolean))];
  }

  deleteRecord(index: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.filteredRecordsList.splice(index, 1);
    }
  }

}

