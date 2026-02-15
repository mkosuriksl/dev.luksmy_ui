import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice/apiservice.service';
import { EditRentalComponent } from '../edit-rental/edit-rental.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-show-rental',
  templateUrl: './show-rental.component.html',
  styleUrls: ['./show-rental.component.css']
})
export class ShowRentalComponent {
bool=false;
assetCategoryData!:any;
  // userId = localStorage.getItem('USER_ID') ?? "";

  totalLength: any;
  page: number = 1;
  itemsPerPage: number = 2;
  choosenLocation='';
  options: any = {
    componentRestrictions: { country: 'IN' }
  }

  constructor(private apiService: ApiserviceService,private dialog: MatDialog,private router: Router,private fb: FormBuilder) {}

  ngOnInit(): void {
   
  }
  search(){
    this.getAssetCategoryData();
  }
  public handleAddressChange(place: google.maps.places.PlaceResult) {
    console.log(place.formatted_address);
    this.choosenLocation = place.formatted_address ?? "";
  }
//  get pagedData(): any[] {
//   const start = this.page * this.totalLength;
//   const end = start + this.totalLength;
//   return this.getAssetCategoryData.slice(start, end);
// }
editRental(item: any) {
  const dialogRef = this.dialog.open(EditRentalComponent, {
    width: '800px',
    height:'400px',
    data: { item },
  });

  dialogRef.afterClosed().subscribe((result:any) => {
    if(result) {
      
    }
    console.log('The dialog was closed');
   
  });
}
getAssetCategoryData() {
  let params:any={};
  params.userId=localStorage.getItem('USER_ID');
  params.avilableLocation=this.choosenLocation.replace(/\s+/g, '');
  this.apiService.getRental(params).subscribe(
    (response) => {
      this.bool=false;
      this.assetCategoryData = response.data;
    },
    (error) => {
      this.bool=false;
      console.error('Error fetching asset category data:', error);
    }
  );
}

editAssetCategory(assetId: string) {
  console.log("**********8test");
  this.router.navigate(['dashboard/edit-asset-category',assetId]);
}

}
