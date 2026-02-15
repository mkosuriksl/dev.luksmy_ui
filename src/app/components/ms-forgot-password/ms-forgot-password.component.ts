import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-ms-forgot-password',
  templateUrl: './ms-forgot-password.component.html',
  styleUrls: ['./ms-forgot-password.component.css']
})
export class MsForgotPasswordComponent {

  isotp = false;
  formData!: FormGroup;
  newFormData!: FormGroup;
  isNewPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;

  constructor(
    private apiService: ApiserviceService,
    private toast: ToastService,
    private authService: AuthService
  ) { }
  

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

    this.newFormData = new FormGroup({
      otp: new FormControl('', Validators.required),
      newPass: new FormControl('', Validators.required),
      confPass: new FormControl('', Validators.required),
    });
  }

  forgotPassword() {
    const contactValue = this.formData.value.contact;
    const payload: any = this.createPayload(contactValue);

    if (payload) {
      this.apiService.sendPasswordResetEmail1(payload).subscribe(
          (response) => {
            if (response['status']) {
              this.isotp = true;
              this.toast.show(response.message);
            } else {
              this.toast.show(response.message);
            }
          },
          (error) => {
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
      return { email: contactValue, regSource: "MEKANIK" };
    } else if (mobileRegex.test(contactValue)) {
      return { mobile: contactValue, regSource: "MEKANIK" };
    } else {
      return null;
    }
  }

  ChangePassword() {
    const contactValue = this.formData.value.contact;
    const data: any = {
      ...this.createPayload(contactValue),
      otp: this.newFormData.value.otp,
      newPassword: this.newFormData.value.newPass,
      confirmPassword: this.newFormData.value.confPass,
    };

    this.authService.forgetPassVerifyOtp1(data).subscribe(
      (response: any) => {
        if (response['status']) {
          this.toast.show('Password changed successfully!');
        } else {
          this.toast.show(response.message);
        }
      },
      (error: any) => {
        this.toast.show("Some error occurred");
      }
    );
  }
}

