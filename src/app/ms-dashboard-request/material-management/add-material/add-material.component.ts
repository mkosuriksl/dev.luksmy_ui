import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
})
export class AddMaterialComponent implements OnInit {
  materialForm: FormGroup;
  categories: { category: string; subCategories: string[] }[] = [];
  subCategories: string[] = [];
  brands: string[] = [];
  showFilter = true;

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private apiService: ApiserviceService
  ) {
    this.materialForm = this.fb.group({
      materialCategory: ['', Validators.required],
      materialSubCategory: ['', Validators.required],
      brand: ['', Validators.required],
      materials: this.fb.array([this.createMaterialRow()]),
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  get materials(): FormArray {
    return this.materialForm.get('materials') as FormArray;
  }

  getCategories() {
    this.apiService.getDistinctMaterialCategories().subscribe({
      next: (res: any) => {
        this.categories = res || [];
        this.subCategories = ['Select Material Category first'];
      },
      error: () => {
        this.toast.show('Failed to load categories', 3000);
      },
    });
  }

  onCategoryChange(event: Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    const categoryObj = this.categories.find(
      (cat) => cat.category === selectedCategory
    );

    this.subCategories = categoryObj
      ? categoryObj.subCategories
      : ['Select Material Category first'];
    this.brands = [];

    this.materialForm.get('materialSubCategory')?.setValue('');
    this.materialForm.get('brand')?.setValue('');
  }

  onSubCategoryChange(event: Event) {
    const subCategory = (event.target as HTMLSelectElement).value;
    const category = this.materialForm.get('materialCategory')?.value;

    if (
      category &&
      subCategory &&
      subCategory !== 'Select Material Category first'
    ) {
      this.apiService
        .getBrandsByMaterialCategory(category, subCategory)
        .subscribe({
          next: (res: any) => {
            this.brands = Array.isArray(res) ? res : [];
          },
          error: () => {
            this.brands = [];
          },
        });
    } else {
      this.brands = [];
    }
  }

  createMaterialRow(): FormGroup {
    return this.fb.group({
      modelNo: ['', Validators.required],
      modelName: ['', Validators.required],
      sku: [''],
      description: [''],
      image: [''],
      shape: [''],
      width: [''],
      length: [''],
      size: [''],
      thickness: [''],
      status: ['Active'],
    });
  }

  addRow() {
    this.materials.push(this.createMaterialRow());
  }

  removeRow(index: number) {
    if (this.materials.length > 1) {
      this.materials.removeAt(index);
    }
  }

  submitForm() {
    if (this.materialForm.valid) {
      const formValue = this.materialForm.value;

      const payload = [
        {
          materialCategory: formValue.materialCategory,
          materialSubCategory: formValue.materialSubCategory,
          brand: formValue.brand,
          materials: formValue.materials.map((item: any) => ({
            skuId: item.sku,
            modelNo: item.modelNo,
            modelName: item.modelName,
            shape: item.shape,
            width: item.width,
            length: item.length,
            size: item.size,
            thickness: item.thickness,
            status: 'Active',
          })),
        },
      ];

      this.apiService.addMaterial(payload).subscribe({
        next: (res) => {
          this.toast.show(res.message || 'Materials added successfully!', 3000);
          this.materialForm.reset();
          this.materials.clear();
          this.addRow();
        },
        error: (err) => {
          this.toast.show(
            err?.error?.message || 'Failed to save materials!',
            3000
          );
        },
      });
    } else {
      this.toast.show('Please fill all required fields', 3000);
    }
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }
}
