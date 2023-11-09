import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [   
    SignupComponent,
    HomeComponent
  ],
  imports: [ 
    HomeRoutingModule,
    ReactiveFormsModule,
    [CommonModule],
    // NgbModule  
   
  ]
})
export class HomeModule { }
