import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SessionTimeoutService } from 'src/app/services/sessionTimeout/session-timeout.service';

@Component({
  selector: 'app-sp-login',
  templateUrl: './sp-login.component.html',
  styleUrls: ['./sp-login.component.css']
})
export class SpLoginComponent{
  isPasswordVisible: boolean = false;

  get passwordFieldType(): string {
    return this.isPasswordVisible ? 'text' : 'password';
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  formData = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',Validators.required),
  });


  constructor(private apiService: ApiserviceService,
              private authService: AuthService,
              private router : Router,
              private sessionTimeoutService: SessionTimeoutService
             ) {

             }





  loginProcess() {
    console.log("*****");
    if(this.formData?.valid) {
      console.log(this.formData.value);
      this.authService.splogin(this.formData.value.username ?? "",this.formData.value.password ?? "");
      this.sessionTimeoutService.onUserActivity();

    }
  }
  private initSessionTimeoutListener(): void {
    this.sessionTimeoutService.onTimeout().subscribe(() => {

      this.authService.logout();
      this.router.navigate(['/sp-login']);
    });
  }




}
