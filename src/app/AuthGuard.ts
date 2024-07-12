import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private authService: AuthServiceService) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['']); // Redirect to login page if not logged in
      return false;
    }
    return true;
  }


}
