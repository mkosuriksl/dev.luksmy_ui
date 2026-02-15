import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  isOldPasswordVisible: boolean = false;
  isNewPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;

  toggleOldPasswordVisibility(): void {
    this.isOldPasswordVisible = !this.isOldPasswordVisible;
  }

  toggleNewPasswordVisibility(): void {
    this.isNewPasswordVisible = !this.isNewPasswordVisible;
  }

  toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
  constructor(private apiService : ApiserviceService,
    private toast: ToastService,

   ) {}


  updateForm = new FormGroup({
    email: new FormControl(this.getStoredEmail(),Validators.required),
    oldPassword: new FormControl('',Validators.required),
    newPassword: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required),

  });

  ngOnInit(){

  }

  getStoredEmail(): string {
    return localStorage.getItem('EMAIL_ID') || '';
  }




  updateSubmitForm() {
    const email = this.updateForm.value.email ?? '';
    const oldPassword = this.updateForm.value.oldPassword ?? '';
    const newPassword = this.updateForm.value.newPassword ?? '';
    const confirmPassword = this.updateForm.value.confirmPassword ?? '';

    this.apiService.updatePassword(email, oldPassword, newPassword, confirmPassword).subscribe(
      (response) => {
        if (response['status']){
          this.toast.show(response.message);
        }
        else{
          this.toast.show(response.message);
        }
  
      },
      (error) => {
        this.toast.show("some error occured");
      }
    );
  }

  }
