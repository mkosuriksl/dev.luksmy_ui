import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {
  reason: any;
  isPopupOpen: boolean = true;
  

  constructor(
    private api: ApiserviceService,
    private authService: AuthService,
    private router: Router
  ) {}

  close(): void {
    this.isPopupOpen = false;
  
    this.router.navigate(['/sp-dashboard/sp-profile']).then(() => {
      window.location.reload(); 
    });
  }
  

  delete(): void {
    const body = {
      reason: this.reason,
      spId: localStorage.getItem('USER_ID')
    };

    this.api.deleteAccount(body).subscribe((res: any) => {
      if (res.status === true) {
        this.authService.logout();
        this.isPopupOpen = false; 

        this.router.navigateByUrl('/');
      } else {
        console.error('Account deletion failed');
      }
    });
  }
}
