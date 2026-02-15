import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-quotation-report',
  templateUrl: './quotation-report.component.html',
  styleUrls: ['./quotation-report.component.css'],
})
export class QuotationReportComponent {
  tableData: any[] = [];
  categories: { category: string; subCategories: string[] }[] = [];
  subCategories: string[] = [];
  brands: string[] = [];
  isQuotationModalOpen = false;
  selectedQuotationId: string = '';
  quotationDetails: any = {};
  userId = localStorage.getItem('USER_ID') ?? '';
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
    cmatRequestId: new FormControl(''),
    requestedBy: new FormControl(''),
    materialRequestId: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    fromQuotedDate: new FormControl(''),
    toQuotedDate: new FormControl(''),
    deliveryLocation: new FormControl(''),
    status: new FormControl(''),
    supplierId: new FormControl(''),
    userMobile: new FormControl(''),
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

  // ngOnInit(): void {
  //   this.authService.userType$.subscribe((userType) => {
  //     this.userType = userType;
  //   });

  //   this.loadCategories();
  //   this.getMaterialRequestsFromApi();
  // }

  // loadCategories() {
  //   this.apiService.getMaterialCategories().subscribe({
  //     next: (res) => {
  //       this.categories = res || [];
  //     },
  //   });
  // }

  // onCategoryChange(event: Event) {
  //   const category = (event.target as HTMLSelectElement).value;
  //   if (category) {
  //     this.apiService.getBrandsByCategory(category).subscribe({
  //       next: (res) => {
  //         this.brands = res || [];
  //       },
  //       error: (err) => console.error('Error loading brands', err),
  //     });
  //   } else {
  //     this.brands = [];
  //   }
  // }
  ngOnInit() {
    this.getCategories();
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
  get totalPages() {
    return Math.ceil(this.totalLength / this.itemsPerPage);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
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

  getMaterialRequestsFromApi(): void {
    const formValues = this.materialRequestForm.value;

    const supplierId = formValues.supplierId || localStorage.getItem('USER_ID');

    if (!supplierId) {
      this.toast.show('Supplier ID not found. Please log in again.', 3000);
      return;
    }

    let params = new HttpParams()
      .set('supplierId', supplierId)
      .set('regSource', 'MRMASON');

    if (formValues.userMobile) {
      params = params.set('userMobile', formValues.userMobile);
    }

    if (formValues.cmatRequestId) {
      params = params.set('cmatRequestId', formValues.cmatRequestId);
    }

    if (formValues.fromQuotedDate) {
      params = params.set('fromQuotedDate', formValues.fromQuotedDate);
    }

    if (formValues.toQuotedDate) {
      params = params.set('toQuotedDate', formValues.toQuotedDate);
    }

    if (formValues.status) {
      params = params.set('status', formValues.status);
    }

    this.bool = true;

    this.apiService.getMaterialSupplierQuotationHeader(params).subscribe({
      next: (res: any) => {
        this.tableData = res?.materialSupplierQuotationHeaders ?? [];
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

  openQuotationDetails(item: any) {
    this.selectedQuotationId = item.quotationId;
    this.isQuotationModalOpen = true;

    const filters = {
      quotationId: item.quotationId,
      supplierId: item.supplierId,
      cmatRequestId: item.cmatRequestId,
      materialLineItem: item.materialLineItem,
    };

    this.apiService.getMaterialSupplierQuotationDetails(filters).subscribe({
      next: (res) => {
        this.quotationDetails = {
          ...res,
          materialSuppliers: res.materialSuppliers?.sort(
            (a: { quotedDate: string }, b: { quotedDate: string }) =>
              new Date(b.quotedDate).getTime() -
              new Date(a.quotedDate).getTime()
          ),
        };
      },
      error: () => {
        this.quotationDetails = { materialSuppliers: [] };
      },
    });
  }

  closeQuotationModal() {
    this.isQuotationModalOpen = false;
    this.quotationDetails = {};
  }

  generateInvoice(row: any) {
    if (!row) return;

    const body = {
      cmatRequestId: row.cmatRequestId,
      invoiceStatus: row.invoiceStatus,
      quotationId: row.quotationId,
      supplierId: row.supplierId,
      quotedAmount: row.quotedAmount,
      quotations:
        row.quotations?.map((q: any) => ({
          materialLineItem: q.materialLineItem,
          discount: q.discount,
          gst: q.gst,
          mrp: q.mrp,
        })) || [],
    };

    const userId = localStorage.getItem('USER_ID') ?? undefined;

    this.bool = true;
    this.apiService.updateStatusWithInvoiced(body, userId).subscribe({
      next: (res: any) => {
        this.bool = false;
        this.toast.show(res?.message || 'Invoice generated successfully', 3000);
        row.invoiceStatus = 'INVOICED';
      },
      error: () => {
        this.bool = false;
        this.toast.show('Invoice generated successfully', 3000);
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

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  closeReportModal() {
    this.isReportModalOpen = false;
  }
}
