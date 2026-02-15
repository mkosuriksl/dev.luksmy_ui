import { Component } from '@angular/core';

@Component({
  selector: 'app-material-delivery-status',
  templateUrl: './material-delivery-status.component.html',
})
export class MaterialDeliveryStatusComponent {
  showFilter = true;
  showDetails = false;

  orderDetails = [
    {
      materialCategory: 'Steel',
      subCategory: 'Rods',
      skuId: 'SKU001',
      expectedDeliveryDate: '2025-11-10',
      status: 'Pending',
    },
    {
      materialCategory: 'Cement',
      subCategory: 'OPC 53',
      skuId: 'SKU002',
      expectedDeliveryDate: '2025-11-11',
      status: 'Delivered',
    },
  ];

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  toggleOrderDetails() {
    this.showDetails = true;
  }
}
