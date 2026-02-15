import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';

@Component({
  selector: 'app-msstockmaster',
  templateUrl: './msstockmaster.component.html',
  styleUrls: ['./msstockmaster.component.css']
})
export class MsstockmasterComponent implements OnInit {

  productForm: FormGroup;
  materialData: any[] = [];
  materialCategory = [];
  materialSubCategory = [];
  brand = [];


  constructor(private fb: FormBuilder, private apiService: ApiserviceService) {
    this.productForm = this.fb.group({
      commonFields: this.fb.group({
        materialCategory: [''],
        materialSubCategory: [''],
        brand: ['']
      }),
      products: this.fb.array([this.createProductGroup()])
    });
  }

  ngOnInit(): void {
    this.getMaterialCategory();
  }

  createProductGroup(): FormGroup {
    return this.fb.group({
      shape: [''],
      modelNo: ['', Validators.required],
      model: ['', Validators.required],
      width: [''],
      length: [''],
      size: [''],
      thickness: [''],
    });
  }

  get products(): FormArray {
    return this.productForm.get('products') as FormArray;
  }

  addProduct(): void {
    this.products.push(this.createProductGroup());
  }

  removeProduct(index: number): void {
    if (this.products.length > 1) {
      this.products.removeAt(index);
    }
  }

  onSubmit(): void {
    const commonFields = this.productForm.get('commonFields')?.value;
    const products = this.products.value;

    const finalObject = [{
      materialCategory: commonFields.materialCategory,
      materialSubCategory: commonFields.materialSubCategory,
      brand: commonFields.brand,
      materials: products.map((product: any) => ({
        thickness: product.thickness,
        modelNo: product.modelNo,
        modelName: product.model,
        materialCategory: commonFields.materialCategory,
        materialSubCategory: commonFields.materialSubCategory,
        shape: product.shape,
        width: product.width,
        length: product.length,
        size: product.size
      }))
    }];
    this.apiService.addAdminMaterials(finalObject).subscribe((res: any) => { });
  }

  getMaterialCategory(): void {
    this.apiService.getMaterialCategory().subscribe((res: any) => {
      this.materialData = res;
      this.materialCategory = res.map((item: any) => item.category);
    });
  }

  getmaterialSubCategory() {
    const selectedCategory = this.productForm.get('commonFields.materialCategory')?.value;

    if (selectedCategory) {
      this.updateSubCategories(selectedCategory);
    }
  }

  updateSubCategories(category: string) {
    const found = this.materialData.find((item) => item.category === category);
    this.materialSubCategory = found ? found.subCategories : [];
  }

  getBrandData() {
    const selectedCategory = this.productForm.get('commonFields.materialCategory')?.value;
    const selectedSubCategory = this.productForm.get('commonFields.materialSubCategory')?.value;
    this.apiService.getBrandDataAsPermaterialcategory(selectedCategory,selectedSubCategory).subscribe((res: any) => {
      this.brand = res;
    });
  }

  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.products.at(index).patchValue({ image: file });
    }
  }

}
