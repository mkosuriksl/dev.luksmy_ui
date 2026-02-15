import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-assets-category-report',
  templateUrl: './assets-category-report.component.html',
  styleUrls: ['./assets-category-report.component.css']
})
export class AssetsCategoryReportComponent {
  tableData: any[] = [];
  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 8;
  choosenLocation = "";


  // customerRequestForm = new FormGroup({

  //   location: new FormControl('',Validators.required),
  //   category: new FormControl('',Validators.required),
  //   subCategory: new FormControl('',Validators.required),
  //   userId: new FormControl('',Validators.required),

  // });

  constructor(private apiService: ApiserviceService,  public dialogRef: MatDialogRef<AssetsCategoryReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    console.log('printing data!!!!!');
    console.log(this.data);
    this.customerAssetSearch(this.data.customerID);
 }

 options: any = {
  componentRestrictions: { country: 'IN', }
}
public handleAddressChange(place: google.maps.places.PlaceResult) {
  console.log(place.formatted_address);
  this.choosenLocation = place.formatted_address ?? "";
}

customerAssetSearch(user_id: string) {

  const appKey = this.apiService.appKey; // Replace with your actual app key

  this.apiService.searchCustomerAssets(
    appKey,user_id
  ).subscribe(
    (response) => {
      if(response.status){
        console.log(response);
        this.tableData = response.data;
      } else {
        console.log("Error fetching Asset Category Report");
      }


    },
    (error) => {
      console.error('Error fetching customer assets:', error);
      // ... (handle error)
    }
  );
}



 get pagedData(): any[] {
  const start = this.page * this.totalLength;
  const end = start + this.totalLength;
  return this.tableData.slice(start, end);
}

onCloseClick(): void {
  this.dialogRef.close();
}

}
