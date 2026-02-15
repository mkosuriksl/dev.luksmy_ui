import { Component } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-msshowmaster',
  templateUrl: './msshowmaster.component.html',
  styleUrls: ['./msshowmaster.component.css']
})
export class MsshowmasterComponent {
  records: any[] = [];
  selectedImages: any[] = [];
  selectedSkuId: string | null = null;

  filter = {
    materialCategory: '',
    materialSubCategory: '',
    brand: '',
    modelNo: '',
    modelName: '',
    shape: '',
    size: '',
    thickness: '',
    status: ''
  };

  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private apiService: ApiserviceService,
    private modalService: NgbModal,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.getMaterialData();
  }

  getMaterialData() {
    this.apiService.getAdminMaterialMaster().subscribe((data: any) => {
      if (data) {
        this.records = data.getAdminMaterialMaster;
      }
    });
  }

  deleteRecord(index: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.records.splice(index, 1);
    }
  }

  totalRecords() {
    return this.filteredRecords().length;
  }

  uniqueValues(field: string) {
    return [...new Set(this.records.map(rec => rec[field]).filter((v: any) => v))];
  }

  filteredRecords() {
    return this.records.filter(rec =>
      (this.filter.materialCategory ? rec.materialCategory?.toLowerCase() === this.filter.materialCategory.toLowerCase() : true) &&
      (this.filter.materialSubCategory ? rec.materialSubCategory?.toLowerCase() === this.filter.materialSubCategory.toLowerCase() : true) &&
      (this.filter.brand ? rec.brand?.toLowerCase() === this.filter.brand.toLowerCase() : true) &&
      (this.filter.modelNo ? rec.modelNo?.toLowerCase() === this.filter.modelNo.toLowerCase() : true) &&
      (this.filter.modelName ? rec.modelName?.toLowerCase() === this.filter.modelName.toLowerCase() : true) &&
      (this.filter.shape ? rec.shape?.toLowerCase() === this.filter.shape.toLowerCase() : true) &&
      (this.filter.size ? rec.size?.toLowerCase() === this.filter.size.toLowerCase() : true) &&
      (this.filter.thickness ? rec.thickness?.toLowerCase() === this.filter.thickness.toLowerCase() : true) &&
      (this.filter.status ? rec.status?.toLowerCase() === this.filter.status.toLowerCase() : true)
    );
  }

  paginatedRecords() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredRecords().slice(start, start + this.itemsPerPage);
  }

  totalPages() {
    return Math.ceil(this.filteredRecords().length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  resetFilters() {
    this.filter = {
      materialCategory: '',
      materialSubCategory: '',
      brand: '',
      modelNo: '',
      modelName: '',
      shape: '',
      size: '',
      thickness: '',
      status: ''
    };

    this.currentPage = 1;
  }

  viewImages(record: any, content: any) {
    this.selectedSkuId = record.skuId;
    const imageKeys = Object.keys(record).filter(k => k.startsWith('materialMasterImage'));
    this.selectedImages = imageKeys
      .map(k => record[k])
      .filter((url: string | null) => !!url);

    this.modalService.open(content, { size: 'lg', centered: true });
  }

  // uploadImg() {
  //   if (!this.selectedSkuId) {
  //     alert('No SKU ID selected for upload!');
  //     return;
  //   }

  //   const input = document.createElement('input');
  //   input.type = 'file';
  //   input.accept = 'image/*';
  //   input.multiple = true;

  //   input.onchange = (event: any) => {
  //     const files = event.target.files;
  //     if (files.length) {
  //       const formData = new FormData();
  //       formData.append('skuId', this.selectedSkuId as string);

  //       for (let i = 0; i < files.length; i++) {
  //         formData.append('images', files[i]);
  //       }

  //       (formData as any).forEach((value: any, key: string) => {
  //         console.log(`${key}:`, value);
  //       });


  //       this.apiService.uploadMaterialImages(formData,this.selectedSkuId).subscribe({
  //         next: (res) => {
  //           alert('Images uploaded successfully!');
  //           this.getMaterialData();
  //         },
  //         error: (err) => {
  //           console.error(err);
  //           alert('Failed to upload images.');
  //         }
  //       });
  //     }
  //   };

  //   input.click();
  // }


  imageFiles: File[] = [];
  imagePreviews: string[] = [];


  uploadImages(): void {
    if (!this.selectedSkuId) {
      this.toast.show('No SKU ID selected for upload', 3000);
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;

    input.onchange = (event: any) => {
      const files: FileList = event.target.files;
      if (!files || files.length === 0) return;

      this.imageFiles = [];
      this.imagePreviews = [];

      Array.from(files).forEach((file) => {
        this.imageFiles.push(file);
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });

      setTimeout(() => {
        if (confirm(`Upload ${this.imageFiles.length} image(s)?`)) {
          this.startImageUpload();
        }
      }, 300);
    };

    input.click();
  }

  private startImageUpload(): void {
    const skuId = this.selectedSkuId!;
    const formData = new FormData();
    
    this.imageFiles.forEach((file, i) => {
      formData.append(`materialMasterImage${i + 1}`, file);
    });

    this.apiService.uploadMaterialImages(formData, skuId).subscribe({
      next: (res: any) => {
        if (res?.error === 'false' || res?.success) {
          this.toast.show('Images uploaded successfully!', 3000);
          this.modalService.dismissAll();
          this.getMaterialData();
        } else {
          this.toast.show(res?.message || 'Image upload failed', 3000);
        }
      },
      error: (err) => {
        console.error(err);
        this.toast.show('Error uploading images', 3000);
      },
    });
  }


}