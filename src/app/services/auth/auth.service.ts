import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import { ApiserviceService } from '../apiservice/apiservice.service';
import { userData } from '../../interfaces/user.modal';
import { UserDetails } from '../../interfaces/user-details.modal';
import { ToastService } from '../toast/toast.service';
import { updateProfile } from 'src/app/interfaces/updateProfile.modal';
import { SessionTimeoutService } from '../sessionTimeout/session-timeout.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userTypeSubject = new BehaviorSubject<string>('');
  private USER_TYPE_KEY = 'userType';
  userType$ = this.userTypeSubject.asObservable();

  constructor(
    private router: Router,
    private apiService: ApiserviceService,
    private toast: ToastService,
    private sessionTimeoutService: SessionTimeoutService,
  ) {
    this.isLoggedIn();
    this.userTypeSubject.next(localStorage.getItem(this.USER_TYPE_KEY) ?? '');
    // this.initSessionTimeoutListener();
  }

  private timeout: number = 30 * 1000;
  private lastActivity: number = Date.now();

  private tokenKey = 'token';
  public isLoggedIn$ = new BehaviorSubject(false);
  public isAdmin$ = new BehaviorSubject(false);
  public userName$ = new BehaviorSubject('');
  private user_id = '';

  private user = new BehaviorSubject<any>(null);
  user$ = this.user.asObservable();

  public login(username: string, password: string): void {
    this.apiService.login(username, password).subscribe({
      next: (res) => {
        console.log(res);
        if (res['status']) {
          this.sessionTimeoutService.initSessionTimeout();
          this.sessionTimeoutService.onTimeout().subscribe(() => {
            this.logout();
          });

          const userDetails = {
            username: username,
          };

          localStorage.setItem('username', res.loginDetails.userName);
          localStorage.setItem(this.tokenKey, 'true');
          localStorage.setItem('USER_ID', res.loginDetails.userid);
          localStorage.setItem('PINCODE_NO', res.loginDetails.userPincode);
          localStorage.setItem('EMAIL_ID', res.loginDetails.userEmail);
          localStorage.setItem('jwtToken', res.jwtToken);
    
          this.userName$.next(res.loginDetails.NAME);
          this.userTypeSubject.next('EC');
          localStorage.setItem(this.USER_TYPE_KEY, 'EC');

          if (res.loginDetails.usertype === 'EC') {
            this.isAdmin$.next(false);
            this.router.navigate(['/ec-dashboard']);
            this.user.next({ username: username, role: 'user' });
          } else {
            this.isAdmin$.next(true);
            this.router.navigate(['/dashboard']);
          }
          this.isLoggedIn$.next(true);
        } else {
          this.toast.show(res.message);
        }
      },
      error: (error) => {},
    });
  }

  public splogin(username: string, password: string): void {
    this.apiService.spLogin(username, password).subscribe({
      next: (res) => {
        if (res['status']) {
          this.userTypeSubject.next('SP');
          localStorage.setItem('username', res.loginDetails.name);
          localStorage.setItem(this.USER_TYPE_KEY, 'SP');
          localStorage.setItem('CITY', res.loginDetails.city);
          localStorage.setItem(this.tokenKey, 'true');
          localStorage.setItem('STATUS', res.loginDetails.status);
          localStorage.setItem('PINCODE_NO', res.loginDetails.pincodeNo);
          localStorage.setItem('USER_ID', res.loginDetails.bodSeqNo);
          localStorage.setItem('EMAIL_ID', res.loginDetails.email);
          localStorage.setItem('jwtToken', res.jwtToken);
          localStorage.setItem(
            'serviceCategory',
            res.loginDetails.serviceCategory,
          );

          this.sessionTimeoutService.initSessionTimeout();
          this.sessionTimeoutService.onTimeout().subscribe(() => {
            this.logout();
          });

          const userDetails = {
            username: username,
          };

          this.userName$.next(res.loginDetails.name);

          if (res.loginDetails.userType === 'Developer') {
            this.isAdmin$.next(false);
            this.router.navigate(['/sp-dashboard']);
            this.user.next({ username: username, role: 'user' });
          } else {
            this.isAdmin$.next(true);
            this.router.navigate(['/dashboard']);
          }
          this.isLoggedIn$.next(true);
        } else {
          this.toast.show(res.message);
        }
      },
      error: (error) => {},
    });
  }

  public mslogin(username: string, password: string): void {
    this.apiService.msLogin(username, password).subscribe({
      next: (res) => {
        if (res['status']) {
          this.userTypeSubject.next('MS');
          localStorage.setItem('username', res.loginDetails.name);
          localStorage.setItem(this.USER_TYPE_KEY, res.loginDetails.userType);
          localStorage.setItem('CITY', res.loginDetails.city);
          localStorage.setItem(this.tokenKey, 'true');
          localStorage.setItem('STATUS', res.loginDetails.status);
          localStorage.setItem('PINCODE_NO', res.loginDetails.pincodeNo);
          localStorage.setItem('USER_ID', res.loginDetails.bodSeqNo);
          localStorage.setItem('EMAIL_ID', res.loginDetails.email);
          localStorage.setItem('jwtToken', res.jwtToken);
          localStorage.setItem(
            'serviceCategory',
            res.loginDetails.serviceCategory,
          );

          this.sessionTimeoutService.initSessionTimeout();
          this.sessionTimeoutService.onTimeout().subscribe(() => {
            this.logout();
          });

          const userDetails = {
            username: username,
          };

          this.userName$.next(res.loginDetails.name);

          if (res.loginDetails.userType === 'MS') {
            this.isAdmin$.next(false);
            this.router.navigate(['/ms-dashboard']);
            this.user.next({ username: username, role: 'user' });
          } else {
            this.isAdmin$.next(true);
            this.router.navigate(['/dashboard']);
          }
          this.isLoggedIn$.next(true);
        } else {
          this.toast.show(res.message);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public adminLogin(username: string, password: string): void {
    this.apiService.adminLogin(username, password).subscribe({
      next: (res) => {
        console.log(res);
        if (res['status']) {
          localStorage.setItem('username', res.data.adminName);

          this.userTypeSubject.next('ADMIN');
          localStorage.setItem(this.USER_TYPE_KEY, 'ADMIN');

          this.sessionTimeoutService.initSessionTimeout();
          this.sessionTimeoutService.onTimeout().subscribe(() => {
            this.logout();
          });
          const userDetails = {
            username: username,
          };
          console.log(res);

          this.userName$.next(res.data.adminName);
          localStorage.setItem(this.tokenKey, 'true');
          localStorage.setItem('jwtToken', res.jwtToken);
          this.router.navigate(['/dashboard']); // Change to the admin dashboard route
        } else {
          this.toast.show(res.message);
        }
      },
      error: (error) => {
        // Handle the error
      },
    });
  }

  public register(userData: userData): Observable<any> {
    return this.apiService.register(userData);
  }

  getUserId() {
    return this.user_id;
  }

  public logout() {
    let ut = localStorage.getItem('userType');
    if (ut == 'ADMIN') {
      this.router.navigate(['/admin']);
    } else if (ut == 'SP') {
      this.router.navigate(['/sp-login']);
    } else if (ut == 'MS') {
      this.router.navigate(['/ms-login']);
    } else {
      this.router.navigate(['/login']);
    }
    localStorage.removeItem('userType');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    localStorage.removeItem('USER_ID');
    localStorage.removeItem('PINCODE_NO');
    localStorage.removeItem('EMAIL_ID');
    localStorage.removeItem('serviceCategory');
    localStorage.removeItem('token');
    this.isLoggedIn$.next(false);
    // this.toast.show("Logout Successfully");
  }

  // public forgotPassword(email:string) {
  //   this.apiService.sendPasswordResetEmail(email).
  //   subscribe((res) => {
  //     if(res['status']) {
  //       this.router.navigate(['/login']);
  //     } else {
  //       console.log('enter correct creds');
  //     }
  //   })
  // }
  public forgetPassVerifyOtp(data: any): any {
    this.apiService.forgetverifyotp(data).subscribe((res) => {
      if (res['status']) {
        this.router.navigate(['/login']);
        this.toast.show(res.message);
      } else {
        console.log('enter correct creds');
        this.toast.show(res.message);
      }
    });
  }
  forgetPassVerifyOtp1(data: any): any {
    this.apiService.forgetverifyotp1(data).subscribe((res) => {
      if (res['status']) {
        this.router.navigate(['/login']);
        this.toast.show(res.message);
      } else {
        console.log('enter correct creds');
        this.toast.show(res.message);
      }
    });
  }

  forgetPassVerifyOtpforMS(data: any): any {
    this.apiService.forgetverifyotp1(data).subscribe((res) => {
      if (res['status']) {
        this.router.navigate(['/ms-login']);
        this.toast.show(res.message);
      } else {
        console.log('enter correct creds');
        this.toast.show(res.message);
      }
    });
  }

  forgetPassVerifyOtp2(data: any): any {
    this.apiService.forgetverifyotp2(data).subscribe((res) => {
      if (res['status']) {
        // this.router.navigate(['/admin']);
        this.toast.show(res.message);
      } else {
        console.log('enter correct creds');
        this.toast.show(res.message);
      }
    });
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    let userName = localStorage.getItem('username') ?? '';
    console.log('is logged in', token != null);
    this.isLoggedIn$.next(token != null);
    this.userName$.next(userName);
    return token != null;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
