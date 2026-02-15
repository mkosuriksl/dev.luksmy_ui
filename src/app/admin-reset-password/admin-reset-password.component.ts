import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from '../services/apiservice/apiservice.service';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/toast/toast.service';

@Component({
  selector: 'app-admin-reset-password',
  templateUrl: './admin-reset-password.component.html',
  styleUrls: ['./admin-reset-password.component.css']
})
export class AdminResetPasswordComponent {
  isotp = false;
  formData!: FormGroup;
  formData1!: FormGroup;

  constructor(
    private apiService: ApiserviceService,
    private toast: ToastService,
    private authService: AuthService
  ) {}
  isNewPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  toggleNewPasswordVisibility(): void {
    this.isNewPasswordVisible = !this.isNewPasswordVisible;
  }
  toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formData = new FormGroup({
      contact: new FormControl('', Validators.required),
    });
    this.formData1 = new FormGroup({
      otp: new FormControl('', Validators.required),
      newPass: new FormControl('', Validators.required),
      confPass: new FormControl('', Validators.required),
    });
  }

  forgotPassword() {
    const contactValue = this.formData.value.contact;
    const payload:any = this.createPayload(contactValue);

    if (payload) {
      this.apiService.sendPasswordResetEmail2(payload)
        .subscribe(
          (response:any) => {
            if (response['status']) {
              this.isotp = true;
              this.toast.show(response.message);
            } else {
              this.toast.show(response.message);
            }
          },
          (error:any) => {
            this.toast.show("Some error occurred");
          }
        );
    } else {
      this.toast.show("Invalid input. Please enter a valid email or mobile number.");
    }
  }

  createPayload(contactValue: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;

    if (emailRegex.test(contactValue)) {
      return { email: contactValue };
    } else if (mobileRegex.test(contactValue)) {
      return { mobile: contactValue };
    } else {
      return null;
    }
  }

  ChangePassword() {
    const contactValue = this.formData.value.contact;
    let payload :any = this.createPayload(contactValue);

    if (payload) {
      if (payload.email) {
        payload = { email: payload.email };
      }

      const data = {
        ...payload,
        otp: this.formData1.value.otp,
        newPass: this.formData1.value.newPass,
        confPass: this.formData1.value.confPass
      };

    this.authService.forgetPassVerifyOtp2(data).subscribe(
      (response:any) => {
        if (response['status']) {
          this.toast.show('Password changed successfully!');
        } else {
          this.toast.show(response.message);
        }
      },
      (error:any) => {
        this.toast.show("Some error occurred");
      }
    );
  }
  }
}
