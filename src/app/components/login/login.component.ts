import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../../services/apiservice/apiservice.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SessionTimeoutService } from 'src/app/services/sessionTimeout/session-timeout.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formData!: FormGroup;
  isOldPasswordVisible: boolean = false;
  isPasswordVisible: boolean = false;
  lastUserType: string = 'CUSTOMER';
  toggleOldPasswordVisibility(): void {
    this.isOldPasswordVisible = !this.isOldPasswordVisible;
  }

  constructor(
    private apiService: ApiserviceService,
    private authService: AuthService,
    private router: Router,
    private sessionTimeoutService: SessionTimeoutService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.initForm();

    const lastUserStr = localStorage.getItem('lastUser');
    if (lastUserStr) {
      const lastUser = JSON.parse(lastUserStr);
      this.lastUserType = this.getFullUserType(lastUser.userType);
    } else {
      this.lastUserType = 'CUSTOMER';
    }

    if (this.apiService.isAutoLogout) {
      this.authService.logout();
      this.toast.show('You have been logged out due to inactivity.', 5000);
    }
  }

  getFullUserType(userType: string): string {
    switch (userType) {
      case 'MS':
        return 'MATERIAL SUPPLIER';
      case 'SP':
        return 'SERVICE PERSON';
      case 'EC':
        return 'CUSTOMER';
      case 'ADMIN':
        return 'ADMIN';
      default:
        return 'CUSTOMER';
    }
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  initForm() {
    this.formData = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }
  
  loginProcess() {
    if (this.formData?.valid) {
      const { username, password } = this.formData.value;
      switch (this.lastUserType) {
        case 'MATERIAL SUPPLIER':
          this.authService.mslogin(username, password);
          break;
        case 'SERVICE PERSON':
          this.authService.splogin(username, password);
          break;
        case 'ADMIN':
          this.authService.adminLogin(username, password);
          break;
        default:
          this.authService.login(username, password);
          break;
      }

      this.sessionTimeoutService.onUserActivity();
    }
  }
}
