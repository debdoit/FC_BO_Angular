




import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/services/user-store.service';
import { ActivatedRoute } from '@angular/router';
// import Swal from 'sweetalert2';
 
 
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  public users: any = [];
  public fullName: string = "";
  // ishomeRoute: boolean = false;
  public role!:string;
 
  //Sidebar toggle show hide function
  status = true;
  addToggle() {
    this.status = !this.status;
  }
  data: any;
  constructor(private auth: AuthService, private userStore: UserStoreService, private route: ActivatedRoute) { }
 
  ngOnInit() {
    this.userStore.getFullNameFromStore().subscribe(fullName => {
      console.log('Full Name from Store:', fullName);
      
      if (fullName) {
        
        this.fullName = fullName;
      } else {
        this.fullName = this.auth.getfullNameFromToken();
      }
      console.log('Full Name in Component:', this.fullName);
      
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      console.log('Role Store:', val);
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;

      console.log('Role Store:', this.role );
    })
  }
 
 
 
 
  logout() {
   this.auth.signOut();
    //Swal.fire('Simple Notification');
  }
}