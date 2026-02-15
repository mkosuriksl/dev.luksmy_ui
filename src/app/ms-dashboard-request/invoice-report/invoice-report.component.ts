import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-invoice-report',
  templateUrl: './invoice-report.component.html',
  styleUrls: ['./invoice-report.component.css'],
})
export class InvoiceReportComponent implements OnInit {
  tableData: any[] = [];
  showFilter = true;
  categories: { category: string; subCategories: string[] }[] = [];
  subCategories: string[] = [];
  brands: string[] = [];
  selectedQuotationDetails: any[] = [];
  showDetailsModal = false;
  detailsLoading = false;
  expandedInvoiceNumber: string | null = null;
  loading = false;
  userType: string = '';

  columnDefs = [
    {
      headerName: 'Invoice Date',
      field: 'invoiceDate',
      valueFormatter: (params: { value: string | number | Date }) =>
        params.value ? new Date(params.value).toLocaleDateString() : '-',
      sort: 'desc' as const,
      sortIndex: 0,
    },

    {
      headerName: 'Quotation ID',
      field: 'quotationId',
    },
    {
      headerName: 'Material Request ID',
      field: 'cmatRequestId',
    },
    {
      headerName: 'Supplier ID',
      field: 'supplierId',
    },
    {
      headerName: 'Invoice Number',
      field: 'invoiceNumber',
      cellRenderer: (params: any) => {
        const value = params.value ?? '-';
        return `<span class="text-primary fw-semibold"
                  style="cursor:pointer; text-decoration:underline;">
              ${value}
            </span>`;
      },
      onCellClicked: (params: any) => this.onInvoiceNumberClick(params.data),
    },
    {
      headerName: 'Quotation Status',
      field: 'quotationStatus',
    },
    {
      headerName: 'Quoted Amount',
      field: 'quotedAmount',
    },
    {
      headerName: 'Quoted Date',
      field: 'quotedDate',
      valueFormatter: (params: any) =>
        params.value ? new Date(params.value).toLocaleDateString() : '-',
    },
    {
      headerName: 'Updated Date',
      field: 'updatedDate',
      valueFormatter: (params: any) =>
        params.value ? new Date(params.value).toLocaleDateString() : '-',
    },
    {
      headerName: 'Action',
      field: 'action',
      sortable: false,
      filter: false,
      minWidth: 180,
      cellRenderer: () =>
        `<button class="btn btn-sm btn-primary">Update Delivery</button>`,
      onCellClicked: (e: any) => this.toggleDeliveryPanel(e.data),
    },
  ];

  defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    minWidth: 160,
    flex: 1,
  };
  deliveryForm = new FormGroup({
    invoiceNumber: new FormControl(''),
    pickupStatus: new FormControl(''),
    deliveryPartner: new FormControl(''),
    truckNumber: new FormControl(''),
    driverName: new FormControl(''),
    phoneNumber: new FormControl(''),
    deliveryStatus: new FormControl(''),
  });

  deliverySaving = false;
  materialRequestForm = new FormGroup({
    materialCategory: new FormControl(''),
    materialSubCategory: new FormControl(''),
    brand: new FormControl(''),
    cMatRequestIdLineid: new FormControl(''),
    materialRequestId: new FormControl(''), // cmatRequestId
    invoiceNumber: new FormControl(''),
    quotationId: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    status: new FormControl(''), // quotationStatus
    quotedAmount: new FormControl(''),
  });

  gridApi: any;
  gridColumnApi: any;

  constructor(
    private apiService: ApiserviceService,
    private toast: ToastService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.getCategories();
    this.authService.userType$.subscribe((type) => (this.userType = type));
  }

  getCategories() {
    this.apiService.getDistinctMaterialCategories().subscribe({
      next: (res: any) => {
        this.categories = res || [];
        if (!this.materialRequestForm.get('materialCategory')?.value) {
          this.subCategories = ['Select Material Category first'];
        }
      },
    });
  }
 isDeliveryExists = false;

toggleDeliveryPanel(row: any) {
  const invoiceNo = row?.invoiceNumber;
  if (!invoiceNo) return;

  this.expandedInvoiceNumber = invoiceNo;

  this.deliveryForm.reset();

  this.deliveryForm.patchValue({
    invoiceNumber: invoiceNo,
    pickupStatus: row.pickupStatus || '',
    deliveryPartner: row.deliveryPartner || '',
    truckNumber: row.truckNumber || '',
    driverName: row.driverName || '',
    phoneNumber: row.phoneNumber || '',
    deliveryStatus: row.deliveryStatus || '',
  });

  // 👇 MAIN LOGIC
  this.isDeliveryExists = !!row.deliveryStatus;
}

saveDelivery() {
  const payload = this.deliveryForm.value;

  if (!payload?.invoiceNumber) {
    this.toast.show('Invoice number is missing', 3000);
    return;
  }

  this.deliverySaving = true;

  const apiCall = this.isDeliveryExists
    ? this.apiService.updateDeliveryReady(payload)
    : this.apiService.addDeliveryReady(payload);

  apiCall.subscribe({
    next: () => {
      this.deliverySaving = false;

      this.toast.show(
        this.isDeliveryExists
          ? 'Delivery updated successfully'
          : 'Delivery added successfully',
        3000
      );
    },
    error: (err) => {
      console.error(err);
      this.deliverySaving = false;
      this.toast.show('Failed to save delivery', 3000);
    },
  });
}



  onInvoiceNumberClick(row: any) {
    if (!row?.quotationId || !row?.cmatRequestId || !row?.invoiceNumber) {
      this.toast.show('Missing required data for details API', 3000);
      return;
    }

    this.detailsLoading = true;
    this.selectedQuotationDetails = [];
    this.showDetailsModal = true;

    let params = new HttpParams()
      .set('quotationId', row.quotationId)
      .set('cmatRequestId', row.cmatRequestId)
      .set('invoiceNumber', row.invoiceNumber)
      .set('quotationStatus', row.quotationStatus || '')
      .set('regSource', 'MRMASON')
      .set('fromInvoiceDate', row.invoiceDate || '')
      .set('toInvoiceDate', row.invoiceDate || '');

    this.apiService.getInvoicesAndQuotationDetails(params).subscribe({
      next: (res: any) => {
        console.log('Details API response:', res);

        // ✅ EXACT KEY from your API response
        const details = res?.materialSupplierInvoiceDetails ?? [];

        this.selectedQuotationDetails = Array.isArray(details) ? details : [];

        this.detailsLoading = false;

        // ✅ optional but helpful
        setTimeout(() => {
          // triggers UI update if needed
          this.selectedQuotationDetails = [...this.selectedQuotationDetails];
        });
      },
      error: (err) => {
        console.error(err);
        this.detailsLoading = false;
        this.toast.show('Failed to load invoice details', 3000);
      },
    });
  }
  openInvoiceDetails(row: any) {
    // same API call code here...
  }

  onCategoryChange(event: Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    const categoryObj = this.categories.find(
      (cat) => cat.category === selectedCategory,
    );

    this.subCategories = categoryObj
      ? categoryObj.subCategories
      : ['Select Material Category first'];

    this.brands = [];
    this.materialRequestForm.get('materialSubCategory')?.setValue('');
    this.materialRequestForm.get('brand')?.setValue('');
  }

  onSubCategoryChange(event: Event) {
    const subCategory = (event.target as HTMLSelectElement).value;
    const category = this.materialRequestForm.get('materialCategory')?.value;

    if (
      category &&
      subCategory &&
      subCategory !== 'Select Material Category first'
    ) {
      this.apiService
        .getBrandsByMaterialCategory(category, subCategory)
        .subscribe({
          next: (res: any) => {
            if (typeof res === 'string') {
              try {
                this.brands = JSON.parse(res);
              } catch {
                this.brands = [];
              }
            } else {
              this.brands = res || [];
            }
          },
          error: () => {
            this.brands = [];
          },
        });
    } else {
      this.brands = [];
    }
  }

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  private formatApiDate(date: any): string {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  }

  search() {
    const formValues = this.materialRequestForm.value;

    this.loading = true;
    this.tableData = [];

    let params = new HttpParams().set('regSource', 'MRMASON');

    // cmatRequestId
    if (formValues.materialRequestId?.trim()) {
      params = params.set('cmatRequestId', formValues.materialRequestId.trim());
    }

    if (formValues.fromDate) {
      params = params.set(
        'fromInvoiceDate',
        this.formatApiDate(formValues.fromDate),
      );
    }

    if (formValues.toDate) {
      params = params.set(
        'toInvoiceDate',
        this.formatApiDate(formValues.toDate),
      );
    }

    if (formValues.invoiceNumber?.trim()) {
      params = params.set('invoiceNumber', formValues.invoiceNumber.trim());
    }

    if (formValues.quotationId?.trim()) {
      params = params.set('quotationId', formValues.quotationId.trim());
    }

    if (formValues.status) {
      params = params.set('quotationStatus', formValues.status);
    }

    this.apiService.getMaterialSupplierInvoiceHeader(params).subscribe({
      next: (res: any) => {
        const headers = res?.materialSupplierQuotationHeaders ?? [];

        if (!headers?.length) {
          this.loading = false;
          this.toast.show('No records found', 3000);
          return;
        }

        this.tableData = headers.map((h: any) => ({
          quotationId: h.quotationId ?? '-',
          cmatRequestId: h.cmatRequestId ?? '-',
          quotedAmount: h.quotedAmount ?? '-',
          supplierId: h.supplierId ?? '-',
          quotedDate: h.quotedDate ?? '-',
          updatedDate: h.updatedDate ?? '-',
          invoiceNumber: h.invoiceNumber ?? '-',
          quotationStatus: h.quotationStatus ?? '-',
          invoiceDate: h.invoiceDate ?? '-',
          userType: h.userType ?? '-',
        }));

        setTimeout(() => this.gridApi?.sizeColumnsToFit());

        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.toast.show('Error loading data', 3000);
        console.error(err);
      },
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }
}
