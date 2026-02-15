import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChildFn } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './services/auth/auth.service';

@Injectable({

  providedIn: 'root'

})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,
    ) {}

  canActivate(

    next: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (!this.authService.isLoggedIn()) {

        this.router.navigate(['/login']); // go to login if not authenticated

        return false;

      }

    return true;

  }

}
