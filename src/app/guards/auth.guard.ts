import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // Add Router import
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CanActivateFn } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) {}

  canActivate: CanActivateFn = () => {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.toastr.error("Please Login First");
      this.router.navigate(['login']);
      return false;
    }
  };
}
