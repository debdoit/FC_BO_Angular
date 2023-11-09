import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

import { MyprofileComponent } from '../myprofile/myprofile.component';
import { HomecontentComponent } from '../homecontent/homecontent.component';
import { CustomerlistComponent } from '../customerlist/customerlist.component';
import { TrustedprofessionallistComponent } from '../trustedprofessionallist/trustedprofessionallist.component';
import { PromocodesComponent } from '../promocodes/promocodes.component';
import { CreatebcloginComponent } from '../createbclogin/createbclogin.component';
import { SupportComponent } from '../support/support.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CustomerDashboardComponent } from '../customerdashboard/customerdashboard.component';


const routes: Routes = [
  {
    path: "", component: HomeComponent,
    // canActivate: [AuthGuard],
    children: [

      {
        path: "", component: HomecontentComponent
      },
      {
        path: "customerdashboard/:userId", component: CustomerDashboardComponent
      },
      {
        path: "myprofile", component: MyprofileComponent
      },
      {
        path: "customerlist", component: CustomerlistComponent
      },
      {
        path: "trustedprofessional", component: TrustedprofessionallistComponent
      },
      {
        path: "promocodes", component: PromocodesComponent
      },
      {
        path: "createbclogin", component: CreatebcloginComponent
      },
      {
        path: "support", component: SupportComponent
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }