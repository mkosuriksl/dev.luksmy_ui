import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { gmailValidator, numericValidator } from 'src/app/validators/password-match.validator';

@Component({
  selector: 'app-sp-supplier',
  templateUrl: './sp-supplier.component.html',
  styleUrls: ['./sp-supplier.component.css']
})
export class SpSupplierComponent implements OnInit {
  signupForm!: FormGroup;
  choosenLocation = "";
  supplierType: any;
  supplierCategories!: string[];
  selectedCategory: string = '';

  constructor(
    private apiService: ApiserviceService,
    private router: Router,
    private authService: AuthService,
    private toast: ToastService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getSupplierCategories();
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      mobile: new FormControl('', [Validators.required, numericValidator()]),
      email: new FormControl('', [Validators.required, Validators.email, gmailValidator()]),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      supplierCategory: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      companyName: new FormControl(''),
      pincodeNo: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      userType: new FormControl(''),
    });
    this.onPincodeChange();
  }

  options: any = {
    componentRestrictions: { country: 'IN' }
  }

  onPincodeChange() {
    this.signupForm.get('pincodeNo')?.valueChanges.subscribe((value: any) => {
      if (value.length === 6) {
        this.fetchPincodeDetails(value);
      }
    });
  }

  fetchPincodeDetails(pincode: string) {
    this.http.get(`https://api.postalpincode.in/pincode/${pincode}`).subscribe((response: any) => {
      if (response[0].Status === 'Success') {
        const postOffice = response[0].PostOffice[0];
        this.signupForm.patchValue({
          district: postOffice.District,
          state: postOffice.State,
          city: postOffice.Block
        });
      }
    });
  }

  public handleAddressChange(place: google.maps.places.PlaceResult) {
    this.choosenLocation = place.formatted_address ?? "";
  }

  signupSubmit() {
    const supplierData: any = {
      email: this.signupForm.value.email ?? "",
      password: this.signupForm.value.password ?? "",
      name: this.signupForm.value.name ?? "",
      mobile: this.signupForm.value.mobile ?? "",
      address: this.choosenLocation,
      city: this.signupForm.value.city ?? "",
      state: this.signupForm.value.state ?? "",
      district: this.signupForm.value.district ?? "",
      pincodeNo: this.signupForm.value.pincodeNo ?? "",
      supplierCategory: this.signupForm.value.supplierCategory ?? "",
      businessName: this.signupForm.value.companyName ?? "",
      userType: "MS",
      regSource: "MEKANIK"
    };

    this.apiService.registerSupplierPerson(supplierData).subscribe(
      (response) => {
        if (response && response.status) {
          this.toast.show("Supplier Registered Successfully!");
          this.router.navigate(['/sp-verify-otp'], {
            queryParams: {
              email: this.signupForm.value.email,
              mobile: this.signupForm.value.mobile,
            },
          });
        } else {
          this.toast.show(response['message']);
        }
      },
      (error) => {
        console.error('Error during supplier registration:', error);
      }
    );
  }

  getSupplierCategories() {
    let categories = new Set<string>();
    this.apiService.getServiceType().subscribe((res: any) => {
      this.supplierType = res.data;
      this.supplierType.forEach((supplier: any) => {
        categories.add(supplier.serviceCategory);
        this.supplierCategories = Array.from(categories);
      });
    });
  }
}
