import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-service-details-modal',
  templateUrl: './service-details-modal.component.html',
})
export class ServiceDetailsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ServiceDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
