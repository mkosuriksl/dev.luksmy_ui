import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-show-material-list',
  templateUrl: './show-material-list.component.html',
  styleUrls: ['./show-material-list.component.css'],
})
export class ShowMaterialListComponent implements OnInit {
  categories: { category: string; subCategories: string[] }[] = [];
  subCategories: string[] = [];
  brands: string[] = [];
  materials: any[] = [];
  showFilter = true;
  bool = false;

  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 5;

  isUpdateModalOpen = false;
  isImageUploadModalOpen = false;
  selectedMaterial: any;
  imageFiles: File[] = [];
  imagePreviews: string[] = [];

  filtersForm = new FormGroup({
    materialCategory: new FormControl(''),
    materialSubCategory: new FormControl(''),
    brand: new FormControl(''),
    modelNo: new FormControl(''),
    modelName: new FormControl(''),
    shape: new FormControl(''),
  });

  updateForm = new FormGroup({
    skuId: new FormControl(''),
    modelNo: new FormControl(''),
    modelName: new FormControl(''),
    shape: new FormControl(''),
    width: new FormControl(''),
    length: new FormControl(''),
    thickness: new FormControl(''),
    size: new FormControl(''),
    imageUrl: new FormControl(''),
    status: new FormControl('Active'),
  });

  uploadForm = new FormGroup({
    skuId: new FormControl(''),
    images: new FormControl<string[]>([]),
  });

  constructor(
    private apiService: ApiserviceService,
    private authService: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.apiService.getDistinctMaterialCategories().subscribe({
      next: (res: any) => {
        this.categories = res || [];
        if (!this.filtersForm.get('materialCategory')?.value) {
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

    if (categoryObj) this.subCategories = categoryObj.subCategories;
    else this.subCategories = ['Select Material Category first'];

    this.brands = [];
    this.filtersForm.get('materialSubCategory')?.setValue('');
    this.filtersForm.get('brand')?.setValue('');
  }

  onSubCategoryChange(event: Event) {
    const subCategory = (event.target as HTMLSelectElement).value;
    const category = this.filtersForm.get('materialCategory')?.value;

    if (
      category &&
      subCategory &&
      subCategory !== 'Select Material Category first'
    ) {
      this.apiService
        .getBrandsByMaterialCategory(category, subCategory)
        .subscribe({
          next: (res: any) => {
            this.brands =
              typeof res === 'string' ? JSON.parse(res || '[]') : res || [];
          },
          error: () => (this.brands = []),
        });
    } else {
      this.brands = [];
    }
  }

  getMaterials() {
    this.bool = true;
    const filters = this.filtersForm.value;
    const bodSeqNo = localStorage.getItem('USER_ID');

    const payload = { ...filters, bodSeqNo };

    this.apiService.getMaterials(payload).subscribe({
      next: (res) => {
        this.materials = res?.getAdminMaterialMaster || [];
        this.totalElements = this.materials.length;
        this.totalPages = Math.ceil(this.totalElements / this.pageSize);
        this.currentPage = 0;
        this.bool = false;
      },
      error: () => {
        this.materials = [];
        this.bool = false;
      },
    });
  }

  get pagedMaterials() {
    const start = this.currentPage * this.pageSize;
    return this.materials.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) this.currentPage = page;
  }

  openUpdateModal(material: any) {
    this.updateForm.patchValue({
      skuId: material.skuId,
      modelName: material.modelName,
      modelNo: material.modelNo,
      shape: material.shape,
      width: material.width,
      length: material.length,
      thickness: material.thickness,
      size: material.size,
      status: material.status || 'Active',
    });
    this.isUpdateModalOpen = true;
  }

  openImageUploadModal(material: any) {
    this.selectedMaterial = material;
    this.isImageUploadModalOpen = true;
    this.imageFiles = new Array(5).fill(null);
    this.imagePreviews = new Array(5).fill('');
  }

  closeImageUploadModal() {
    this.isImageUploadModalOpen = false;
  }

  onFileSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (!file) return;

    this.imageFiles[index] = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviews[index] = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  uploadImages() {
    const sku = this.selectedMaterial?.skuId;
    if (!sku) {
      this.toast.show('SKU ID is missing', 3000);
      return;
    }

    const formData = new FormData();
    this.imageFiles.forEach((file, index) => {
      if (file) {
        formData.append(`materialMasterImage${index + 1}`, file);
      }
    });

    this.apiService.uploadMaterialImage(sku, formData).subscribe({
      next: (res: any) => {
        if (res?.error === 'false' || res?.success) {
          this.toast.show('Images uploaded successfully!', 3000);
          this.isImageUploadModalOpen = false;
          this.getMaterials();
        } else {
          this.toast.show(res?.message || 'Image upload failed', 3000);
        }
      },
      error: (err) => {
        this.toast.show('Error uploading images', 3000);
      },
    });
  }
  
  onImageHover(event: MouseEvent, isHovering: boolean) {
    const img = event.target as HTMLImageElement;
    img.style.transform = isHovering ? 'scale(1.1)' : 'scale(1)';
  }

  onUpdateSubmit() {
    if (!this.updateForm.valid) return;

    const formValue = this.updateForm.value;
    const payload = {
      materials: [
        {
          skuId: formValue.skuId,
          modelNo: formValue.modelNo,
          modelName: formValue.modelName,
          shape: formValue.shape,
          width: formValue.width,
          length: formValue.length,
          size: formValue.size,
          thickness: formValue.thickness,
          status: formValue.status,
        },
      ],
    };

    this.apiService.updateMaterial(payload).subscribe({
      next: (res) => {
        this.toast.show(res.message || 'Material updated successfully!', 3000);
        this.isUpdateModalOpen = false;
        this.getMaterials();
      },
      error: (err) =>
        this.toast.show(err?.error?.message || 'Update failed!', 3000),
    });
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  hasFiles() {
    return this.imageFiles.some((f) => f != null);
  }

  removeImage(index: number) {
    this.imageFiles = new Array(5).fill(null);

    this.imagePreviews[index] = '';
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, index: number) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) this.onFileSelected({ target: { files: [file] } }, index);
  }
}
