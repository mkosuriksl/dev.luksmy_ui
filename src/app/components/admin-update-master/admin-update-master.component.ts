import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-admin-update-master',
  templateUrl: './admin-update-master.component.html',
  styleUrls: ['./admin-update-master.component.css'],
})
export class AdminUpdateMasterComponent {
  editForm!: FormGroup;
  materialCategoriesData: any[] = [];
  materialCategories: string[] = [];
  materialSubCategories: string[] = [];
  brands: string[] = [];
  shapes: string[] = [];

  record: any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiserviceService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.record = history.state.record;

    const selectedCategory = this.materialCategories.find(
      (cat: any) => cat.category === this.record?.materialCategory
    );

    this.getMaterialCategory();

    console.log('Material Category from record:', this.record.materialCategory);

    this.editForm = this.fb.group({
      skuId: [this.record?.skuId, Validators.required],
      materialCategory: [this.record?.materialCategory || ''],
      materialSubCategory: [this.record?.materialSubCategory || ''],
      brand: [this.record?.brand || ''],
      modelNo: [this.record?.modelNo || ''],
      modelName: [this.record?.modelName || ''],
      shape: [this.record?.shape || ''],
      width: [this.record?.width || ''],
      length: [this.record?.length || ''],
      size: [this.record?.size || ''],
      thickness: [this.record?.thickness || ''],
      status: [this.record?.status || ''],
      updatedBy: [this.record?.updatedBy || ''],
      updatedDate: [
        this.record?.updatedDate ? this.record.updatedDate.split('T')[0] : '',
      ],
    });
  }

  getMaterialCategory(): void {
    this.apiService.getMaterialCategory().subscribe((res: any) => {
      this.materialCategoriesData = res;
      this.materialCategories = res.map((item: any) => item.category);
    });
  }

  getmaterialSubCategory() {
    const selectedCategory = this.editForm.get('materialCategory')?.value;

    if (selectedCategory) {
      this.updateSubCategories(selectedCategory);
    }
  }

  updateSubCategories(category: string) {
    const found = this.materialCategoriesData.find(
      (item) => item.category === category
    );
    this.materialSubCategories = found ? found.subCategories : [];
  }

  getBrandData() {
    const selectedCategory = this.editForm.get('materialCategory')?.value;
    const selectedSubCategory = this.editForm.get('materialSubCategory')?.value;
    this.apiService
      .getBrandDataAsPermaterialcategory(selectedCategory, selectedSubCategory)
      .subscribe((res: any) => {
        this.brands = res;
      });
  }

  updateRecord() {
    if (this.editForm.valid) {
      const apidata = {
        materials: [this.editForm.value],
      };
      this.apiService.updateAdminMaterials(apidata).subscribe({
        next: (response) => {
          if (response) {
            this.toast.show('Record updated successfully!');
            this.router.navigate(['/ms-dashboard/ms-show-master']);
          }
        },
      });
    } else {
      this.toast.show('Please fill required fields.');
    }
  }
}
