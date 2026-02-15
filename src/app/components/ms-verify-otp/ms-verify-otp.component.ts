import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-ms-verify-otp',
  templateUrl: './ms-verify-otp.component.html',
  styleUrls: ['./ms-verify-otp.component.css']
})
export class MsVerifyOtpComponent {

  email: string | undefined;
  mobile: string | undefined;
  isMobileVerified = false;
  isEmailVerified = false;

  constructor(private apiService: ApiserviceService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toast: ToastService) { }

  verifyForm = new FormGroup({
    mobile: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    enterMobileOTP: new FormControl('', Validators.required),
    enterEmailOTP: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.mobile = params['mobile'];
      this.verifyForm.patchValue({
        email: this.email,
        mobile: this.mobile
      })
    });
  }

  sendMobileOTP() {
    const mobile = this.verifyForm.value.mobile ?? "";

    this.apiService.sendMobileOtpForSupplierPerson(mobile).subscribe(
      (response) => {
        if (response['status']) {
          this.toast.show(response.message);
        } else {
          this.toast.show(response.message);
        }
      },
      (error) => {
        console.log(error);
        this.toast.show("Failed to send mobile OTP!");
      }
    );

  }

  sendEmailOTP() {
    const email = this.verifyForm.value.email ?? "";

    this.apiService.sendEmailOtpForSupplierPerson(email).subscribe(
      (response) => {
        console.log(response);
        if (response['status']) {
          this.toast.show(response.message);
        } else {
          this.toast.show(response.message);
        }
      },
      (error) => {
        this.toast.show("Failed to send email OTP!");
      }
    );
  }

  verifyMobileOTP() {
    const enterOTP = this.verifyForm.value.enterMobileOTP;
    const mobileData = this.verifyForm.value.mobile ?? '';
    if (!enterOTP) {
      this.toast.show("Please enter the OTP");
      return;
    }
    this.apiService.verifyOtpByMobileForSupplierPerson(mobileData, enterOTP).subscribe(
      (response) => {
        if (response['status']) {
          this.isMobileVerified = true;
          this.toast.show(response.message);
        } else {
          this.toast.show(response.message);
        }
      },
      (error) => {
        this.toast.show("Failed to verify mobile OTP");
      }
    );

  }

  verifyEmailOTP() {

    const enterOTP = this.verifyForm.value.enterEmailOTP;
    const email = this.verifyForm.value.email ?? '';
    if (!enterOTP) {
      this.toast.show("Please enter the OTP");
      return;
    }
    this.apiService.verifyOtpByEmailForSupplierPerson(email, enterOTP).subscribe(
      (response) => {
        if (response['status']) {
          this.isEmailVerified = true;
          this.toast.show("Email OTP verification successful");
        }
      },
      (error) => {
        this.toast.show("Failed to verify email OTP");
      }
    );

  }

  isLoginEnabled(): boolean {
    return this.isMobileVerified || this.isEmailVerified;
  }

  verifySubmit() {
    this.router.navigate(['/ms-login']);
    const userData = {
      mobile: this.verifyForm.value.mobile ?? "",
      email: this.verifyForm.value.email ?? "",
    }
  }

}