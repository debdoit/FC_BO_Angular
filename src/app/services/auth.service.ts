import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'; // Import JwtHelperService
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "https://localhost:7127/api/User/";
  private userPayload:any;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  signup(signupObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, signupObj);
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }

  async signOut() {
    // debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to sign out.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sign Out',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        // User clicked "Sign Out," clear localStorage and navigate to the login page
        localStorage.clear();
        this.router.navigate(['']);
      }
    });
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  decodedToken(): any | null {
    const token = this.getToken();
    if (token) {
      const JwtHelper = new JwtHelperService();
      return JwtHelper.decodeToken(token);
    } else {
      // Handle the case where there's no token, e.g., return null or throw an error.
      return null;
    }
  }
  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.unique_name;

  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;

  }

  
  getIdFromToken(){
    if(this.userPayload)
    return this.userPayload.Id;

  }
}
