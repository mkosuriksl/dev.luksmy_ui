import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-ms-show-material-request',
  templateUrl: './ms-show-material-request.component.html',
  styleUrls: ['./ms-show-material-request.component.css'],
})
export class MsShowMaterialRequestComponent {
  tableData: any[] = [];
  categories: { category: string; subCategories: string[] }[] = [];
  subCategories: string[] = [];
  brands: string[] = [];

  showFilter = true;
  totalLength = 0;
  itemsPerPage: number = 5;
  page: number = 1;
  userType: any;
  loading = false;
  bool = false;
  isModalOpen = false;
  isReportModalOpen = false;
  selectedMaterialRequestId: string | null = null;
  selectedRequestId: string = '';
  selectedRequestDetails: any[] = [];
  isEditableMode: boolean = false;

  quoteReportData: any[] = [];

  materialRequestForm = new FormGroup({
    materialCategory: new FormControl(''),
    materialSubCategory: new FormControl(''),
    brand: new FormControl(''),
    itemName: new FormControl(''),
    itemSize: new FormControl(''),
    cMatRequestIdLineid: new FormControl(''),
    requestedBy: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    materialRequestId: new FormControl(''),
    customerName: new FormControl(''),
    customerEmail: new FormControl(''),
    customerNumber: new FormControl(''),
    deliveryLocation: new FormControl(''),
    fromDeliveryDate: new FormControl(''),
    toDeliveryDate: new FormControl(''),
    status: new FormControl(''),
  });

  totalQuotedAmount: number = 0;
  totalMrp: number = 0;
  form: any;

  constructor(
    private apiService: ApiserviceService,
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCategories();

    const loginDetails = JSON.parse(
      localStorage.getItem('loginDetails') || '{}'
    );

    if (loginDetails) {
      this.materialRequestForm.patchValue({
        deliveryLocation:
          loginDetails.location || loginDetails.currentLocation || '',
      });
    }
  }

  getCategories() {
    this.apiService.getDistinctMaterialCategories().subscribe({
      next: (res: any) => {
        this.categories = res || [];
        if (!this.materialRequestForm.get('materialCategory')?.value) {
          this.subCategories = ['Select Material Category first'];
        }
      },
      error: (err) => {
        this.subCategories = [];
      },
    });
  }

  onCategoryChange(event: Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    const categoryObj = this.categories.find(
      (cat) => cat.category === selectedCategory
    );

    if (categoryObj) {
      this.subCategories = categoryObj.subCategories;
    } else {
      this.subCategories = ['Select Material Category first'];
    }

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

  calculateTotal() {
    let totalQuoted = 0;
    let totalMrp = 0;

    this.selectedRequestDetails.forEach((d) => {
      if (d.isSelected) {
        const mrp = Number(d.mrp) || 0;
        const discount = Number(d.discount) || 0;
        const gst = Number(d.gst) || 0;

        const discounted = mrp - (mrp * discount) / 100;
        const quoted = discounted + (discounted * gst) / 100;

        d.quotedAmount = quoted.toFixed(2);

        totalQuoted += quoted;
        totalMrp += mrp;
      }
    });

    this.totalQuotedAmount = totalQuoted;
    this.totalMrp = totalMrp;
  }

  getMaterialRequestsFromApi() {
    const formValues = this.materialRequestForm.value;

    let params = new HttpParams();

    if (formValues.materialRequestId) {
      params = params.set('orderId', formValues.materialRequestId);
    }

    if (formValues.status) {
      params = params.set('orderStatus', formValues.status);
    }

    if (formValues.customerEmail) {
      params = params.set('customerEmail', formValues.customerEmail);
    }

    if (formValues.customerNumber) {
      params = params.set('customerNumber', formValues.customerNumber);
    }

    if (formValues.brand) {
      params = params.set('brand', formValues.brand);
    }

    if (formValues.deliveryLocation) {
      params = params.set('location', formValues.deliveryLocation);
    }

    this.bool = true;

    this.apiService.getOrderDetails1(params).subscribe({
      next: (res: any[]) => {
        this.tableData = (res || []).map((item) => {
          const orderHdr = item.orderHdr || {};
          const customer = item.customer || {};
          const lineItems = orderHdr.customerRetailerOrderDetailsList || [];

          return {
            materialRequestId: orderHdr.orderId ?? '-',
            customerName: customer.customerName ?? '-',
            customerEmail: customer.userEmail ?? '-',
            customerMobile: customer.userMobile ?? '-',
            orderStatus: orderHdr.orderStatus ?? '-',
            location: orderHdr.deliveryMethod ?? '-',
            status: orderHdr.orderStatus ?? '-',
            totalQty: lineItems.reduce(
              (sum: number, li: any) => sum + (li.orderQty || 0),
              0
            ),
            createdDate: orderHdr.orderDate ?? null,
            updatedDate: orderHdr.orderUpdatedDate ?? null,
          };
        });

        this.totalLength = this.tableData.length;
        this.page = 1;
        this.bool = false;
      },
      error: () => {
        this.bool = false;
        this.toast.show('Error loading data', 3000);
      },
    });
  }

  get totalPages() {
    return Math.ceil(this.totalLength / this.itemsPerPage);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
    }
  }

  search(): void {
    this.getMaterialRequestsFromApi();
  }

  get pagedData(): any[] {
    const start = (this.page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.tableData.slice(start, end);
  }

  onRecordsPerPageChange(event: Event) {
    this.itemsPerPage = +(event.target as HTMLSelectElement).value;
    this.page = 1;
  }

  navigateToEdit(item: any) {
    this.router.navigate([
      '/ec-dashboard/update-material-request',
      item.materialRequestId,
    ]);
  }

  openDetailsModalview(item: any) {
    this.selectedRequestId = item.materialRequestId;
    this.isEditableMode = false;
    this.isModalOpen = true;
    this.loading = true;

    const params = new HttpParams().set('orderId', item.materialRequestId);

    this.apiService.getOrderDetails1(params).subscribe({
      next: (res: any[]) => {
        this.loading = false;

        const data = res?.[0]; 
        const orderHdr = data?.orderHdr;
        const details = orderHdr?.customerRetailerOrderDetailsList ?? [];

        this.selectedRequestDetails = details.map((d: any) => ({
          isSelected: false,

          materialCategory: '-',
          brand: d.brand ?? '-',
          itemName: d.skuIdUserId ?? '-',
          itemSize: '-',
          qty: d.orderQty ?? 0,

          orderDate: orderHdr?.orderDate ?? null,
          updatedDate: orderHdr?.orderUpdatedDate ?? null,

          status: orderHdr?.orderStatus ?? 'NEW',

          mrp: Number(d.mrp ?? 0),
          discount: Number(d.discount ?? 0),
          gst: Number(d.gst ?? 0),
          quotedAmount: Number(d.totalAmount ?? 0),

          supplierId: null,
          quotedDate: null,
          cMatRequestIdLineid: d.lineItemId ?? null,
        }));
      },
      error: () => {
        this.loading = false;
        this.toast.show('Error loading request details', 3000);
      },
    });
  }

  openDetailsModal(item: any, editable: boolean) {
    this.selectedRequestId = item.materialRequestId;
    this.isEditableMode = editable;
    this.isModalOpen = true;
    this.loading = true;

    const params = new HttpParams().set('orderId', item.materialRequestId);

    this.apiService.getOrderDetails1(params).subscribe({
      next: (res: any[]) => {
        this.loading = false;

        const data = res?.[0]; 
        const orderHdr = data?.orderHdr;
        const details = orderHdr?.customerRetailerOrderDetailsList ?? [];

        this.selectedRequestDetails = details.map((d: any) => ({
          isSelected: false,

          materialCategory: '-',
          brand: d.brand ?? '-',
          itemName: d.skuIdUserId ?? '-',
          itemSize: '-',
          qty: d.orderQty ?? 0,

          orderDate: orderHdr?.orderDate ?? null,
          updatedDate: orderHdr?.orderUpdatedDate ?? null,

          status: orderHdr?.orderStatus ?? 'NEW',

          mrp: Number(d.mrp ?? 0),
          discount: Number(d.discount ?? 0),
          gst: Number(d.gst ?? 0),
          quotedAmount: Number(d.totalAmount ?? 0),
          cMatRequestIdLineid: d.lineItemId,
          cMatRequestId: d.lineItemId.split('_')[0],
          // supplierId: null,
          // quotedDate: null,
          // cMatRequestIdLineid: d.lineItemId ?? null,
        }));
      },
      error: () => {
        this.loading = false;
        this.toast.show('Error loading request details', 3000);
      },
    });
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedRequestDetails.forEach((d) => (d.isSelected = false));
  }

  allowOnlyNumbers(event: KeyboardEvent): boolean {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  get isQuoted(): boolean {
    return (
      this.selectedRequestDetails?.some((d) => d.status === 'QUOTED') || false
    );
  }

  onSubmitMaterialSupplier() {
    const selectedItems = this.selectedRequestDetails.filter(
      (d) => d.isSelected && d.cMatRequestIdLineid
    );

    if (selectedItems.length === 0) {
      this.toast.show('Please select at least one item to quote', 3000);
      return;
    }
    const cmatRequestId = selectedItems[0].cMatRequestId;

    const quotations = selectedItems.map((d) => ({
      materialLineItem: d.cMatRequestIdLineid,
      discount: Number(d.discount) || 0,
      mrp: Number(d.mrp) || 0,
      gst: Number(d.gst) || 0,
      quotedAmount: Number(d.quotedAmount) || 0,
    }));

    const payload = {
      cmatRequestId, // ✅ FIXED
      quotations,
    };

    this.apiService.addSupplierQuotation(payload).subscribe({
      next: (res) => {
        if (res?.success) {
          this.toast.show('Quotation submitted successfully', 3000);
          this.closeModal();
        } else {
          this.toast.show(res?.message || 'Failed to submit quotation', 3000);
        }
      },
      error: (err) => {
        console.error('Add Supplier Quotation Error:', err);
        this.toast.show(
          err?.error?.message || 'Failed to submit quotation',
          3000
        );
      },
    });
  }

  onUpdateMaterialSupplier() {
    const data = this.selectedRequestDetails
      .filter((d) => d.isSelected && d.cMatRequestIdLineid)
      .map((d) => ({
        materialLineItem: d.cMatRequestIdLineid, 
        discount: Number(d.discount ?? 0),
        gst: Number(d.gst ?? 0),
        mrp: Number(d.mrp ?? 0),
      }));

    if (data.length === 0) {
      this.toast.show('Please select at least one item.');
      return;
    }

    this.apiService.updateSupplierQuotation(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.toast.show(res.message);
          this.isModalOpen = false;
          this.openReportPopup(this.selectedRequestId);
        } else {
          this.toast.show(res?.message ?? 'Update failed');
        }
      },
      error: (err: any) => {
        console.error('Update API Error:', err);
        this.toast.show(err?.error?.message ?? 'Update failed');
      },
    });
  }

  openReportPopup(requestId: string) {
    this.apiService.getQuoteReport(requestId).subscribe({
      next: (res: any) => {
        if (res?.CMaterialRequestHeaderEntity?.length > 0) {
          this.quoteReportData = res.CMaterialRequestHeaderEntity.map(
            (item: any) => {
              const details = item.cmaterialReqHeaderDetailsEntity?.[0] || {};
              return {
                fromDate: item.createdDate,
                toDate: item.updatedDate,
                mobileNumber: item.customerMobile,
                quoteId: details.quotationId || '-',
                status: details.status || '-',
              };
            }
          );
        } else {
          this.quoteReportData = [];
        }
        this.isReportModalOpen = true;
      },
      error: (err) => {
        this.quoteReportData = [];
        this.isReportModalOpen = true;
      },
    });
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  closeReportModal() {
    this.isReportModalOpen = false;
  }
}
