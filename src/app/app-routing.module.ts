import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';





const routes: Routes = [
  
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent,canActivate:[AuthGuard]},
  {
    path: 'home',canActivate:[AuthGuard],
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomeModule,),
  },
  // {path:'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
