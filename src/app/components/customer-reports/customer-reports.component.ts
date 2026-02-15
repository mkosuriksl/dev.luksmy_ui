import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { MatDialog } from '@angular/material/dialog';
import { AssetsCategoryReportComponent } from '../assets-category-report/assets-category-report.component';

@Component({
  selector: 'app-customer-reports',
  templateUrl: './customer-reports.component.html',
  styleUrls: ['./customer-reports.component.css']
})
export class CustomerReportsComponent {
  tableData: any[] = [];
  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 8;
  choosenLocation = "";
bool=false;

  customerRequestForm = new FormGroup({
    userState: new FormControl('',Validators.required),
    fromDate: new FormControl('',Validators.required),
    toDate: new FormControl('',Validators.required),
    phoneNo: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),

  });

  constructor(private apiService: ApiserviceService, private dialog: MatDialog) {}

  ngOnInit(): void {
  //  this.customerReportData();
 }

 options: any = {
  componentRestrictions: { country: 'IN', }
}
public handleAddressChange(place: google.maps.places.PlaceResult) {
  console.log(place.formatted_address);
  this.choosenLocation = place.formatted_address ?? "";

}



 get pagedData(): any[] {
  const start = this.page * this.totalLength;
  const end = start + this.totalLength;
  return this.tableData.slice(start, end);
}

onBlur(e: any) {
  console.log(e);
  if(e.target?.value === "") {
    this.choosenLocation = "";
    console.log('this.choosenLocation is cleared');
  }
}


customerReportData() {
this.bool=true;
  const formData = this.customerRequestForm.value;
  const params: any = {};
  if (this.customerRequestForm.value?.email) {
    params.userEmail =this.customerRequestForm.value?.email;
  }
  if (this.customerRequestForm.value?.phoneNo) {
    params.phNo =this.customerRequestForm.value?.phoneNo;
  }
  if (this.customerRequestForm.value?.fromDate) {
    params.fromDate =this.customerRequestForm.value?.fromDate;
  }
  if (this.customerRequestForm.value?.toDate) {
    params.toDate =this.customerRequestForm.value?.toDate;
  }
  if (this.customerRequestForm.value?.userState) {
    params.userState =this.customerRequestForm.value?.userState;
  }
  // if (formData.email || formData.phoneNo ||  formData.fromDate || formData.fromDate) {
    

    this.apiService.searchCustomer(
      params
    ).subscribe(
      (response) => {
        console.log(response);
        this.bool=false;
        this.tableData = response.data;
        this.totalLength = response.data.length;
        console.log(response.data);
      },
      (error) => {
        this.bool=false;
        console.error('Error fetching customer data:', error);
      }
    );
  // } else {
  //   console.log('At least one parameter is required to make the API request.');
  //   // You might want to handle this case in your UI, e.g., display a message to the user.
  // }
}

openAssetCategoryDialog(customerID: string) {
  const dialogRef = this.dialog.open(AssetsCategoryReportComponent, {
    width: '600px',
    data: { customerID },
  });

}

}
