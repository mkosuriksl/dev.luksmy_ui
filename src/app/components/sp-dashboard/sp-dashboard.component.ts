import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sp-dashboard',
  templateUrl: './sp-dashboard.component.html',
  styleUrls: ['./sp-dashboard.component.css'],
})
export class SpDashboardComponent {
  rentalExpanded = false; 
  isExpanded = true;
  serviceExpanded = false;
constructor(private dialog:MatDialog,private router: Router){}

toggleServiceExpanded(): void {
  this.serviceExpanded = !this.serviceExpanded;
}
toggleRentalExpanded(): void {
  this.rentalExpanded = !this.rentalExpanded;
}

openPopup() {
  this.dialog.open(DeleteAccountComponent, {
    width: '400px',
    data: {}  
  });
}

  
}
