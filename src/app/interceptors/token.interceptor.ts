// import { Injectable } from '@angular/core';
// import { NgToastService } from 'ng-angular-popup';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';
// import { UserSearchService } from '../services/user-search.service';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {

//   constructor(private auth: AuthService, private toast: NgToastService, private router: Router, private UserSearchService: UserSearchService) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const myToken = this.auth.getToken();

//     if (myToken) {
//       request = request.clone({
//         setHeaders: { Authorization: `Bearer ${myToken}` }
//       });
//     }

//     return next.handle(request).pipe(
//       catchError((error: any) => {
//         if (error.status === 401) {
//           this.toast.warning({ detail: "Warning", summary: "Token is expired, Please Login Again" });
//           this.router.navigate(['login']);
//         }

//         // Log the error response
//         console.error('Interceptor error:', error);

//         return throwError(() => new Error("Some other error occurred"));
//       })
//     );
//   }
// }
