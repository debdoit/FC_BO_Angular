import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent {
  public fullName: string = "";
  // ishomeRoute: boolean = false;
  public email: string = "";
  public role!:string;
  // public Id: string = "";
  constructor(private auth: AuthService, private userStore: UserStoreService, private route: ActivatedRoute, private modalService: NgbModal) { }
 
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
    });

  }


 

  
}
