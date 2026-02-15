import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-verfiy-otp',
  templateUrl: './verfiy-otp.component.html',
  styleUrls: ['./verfiy-otp.component.css']
})
export class VerfiyOtpComponent implements OnInit{

  email: string | undefined;
  mobile: string | undefined;
  isMobileVerified = false;
  isEmailVerified = false;

  constructor(private apiService : ApiserviceService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toast: ToastService) {}


  verifyForm = new FormGroup({

    mobile: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    enterMobileOTP: new FormControl('',Validators.required),
    enterEmailOTP: new FormControl('',Validators.required),


  });

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.mobile = params['mobile'];
      this.verifyForm.patchValue({
        email: this.email,
        mobile: this.mobile
      })
    });
    console.log('Email:', this.email);
    console.log('Mobile:', this.mobile);
  }

  sendMobileOTP() {
    console.log(this.verifyForm.value.mobile);
    const mobile = this.verifyForm.value.mobile ?? ""; // Get the mobile number from your form
   // const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
    this.apiService.sendOtpByMobile(mobile).subscribe(
      (response) => {
        console.log("status success");
        if(response['status']){
          this.toast.show("Mobile OTP sent successfully!");
        }else {
          this.toast.show(response.message);
        }
      },
      (error) => {
        console.log(error);
        console.log("status failed")
        this.toast.show("Failed to send mobile OTP!");
      }
    );

  }

  sendEmailOTP() {
    console.log(this.verifyForm.value.email);
    const email = this.verifyForm.value.email ?? "";
    //const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
    this.apiService.sendOtpByEmail(email).subscribe(
      (response) => {
        if(response['status']){
          this.toast.show(response.message);
        }else {
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
   // const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
    if (!enterOTP) {
      this.toast.show("Please enter the OTP");
      return;
    }


    this.apiService.verifyOtpByMobile(mobileData, enterOTP).subscribe(
      (response) => {
        if (response['status']){
          this.isMobileVerified = true;
          this.toast.show(response.message);
        }else {
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
   // const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
    if (!enterOTP) {
      this.toast.show("Please enter the OTP");
      return;
    }
    this.apiService.verifyOtpByEmail(email, enterOTP).subscribe(
      (response) => {
        if (response['status']){
          this.isEmailVerified = true;
          this.toast.show(response.message);
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

      const userData = {
        mobile: this.verifyForm.value.mobile ?? "",
        email: this.verifyForm.value.email ?? "",
      }

}

}
