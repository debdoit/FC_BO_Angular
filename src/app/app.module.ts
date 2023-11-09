import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr'; // Import the module correctly
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { TokenInterceptor } from './interceptors/token.interceptor';
// import { MatDialogueModule } from '@angular/materal/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { CreatebcloginComponent } from './components/createbclogin/createbclogin.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { CustomerlistComponent } from './components/customerlist/customerlist.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomerDashboardComponent } from './components/customerdashboard/customerdashboard.component';
import { TrustedprofessionallistComponent } from './components/trustedprofessionallist/trustedprofessionallist.component';







@NgModule({
  declarations: [
    AppComponent,   
    LoginComponent, 
    CreatebcloginComponent,
    MyprofileComponent,
    CustomerlistComponent,
    CustomerDashboardComponent ,
    TrustedprofessionallistComponent   

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxPaginationModule // Correctly configure the ToastrModule here
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: TokenInterceptor,
  //     multi: true
  //   }
  // ],
  bootstrap: [AppComponent]
})
export class AppModule {}
