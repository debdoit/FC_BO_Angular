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
  public role!:string;
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
    })

   
  }

  // editprofilepopup() {getEmailFromStore
  //   const modalRef = this.modalService.open( {
  //     centered: true,
  //     backdrop: 'static',
  //     keyboard: false,
  //     size: 'md',
  //   });
  //   // modalRef.componentInstance.data = this.data;
  //   // modalRef.componentInstance.profileUpdated.subscribe((updated) => {
  //   //   if (updated) {
  //   //     this.fetchProfileData();
  //   //   }
  //   // });
  //   modalRef.shown
    
  // }

  // navigateToMyProfile() {
  //   this.router.navigate(['/myprofile']);
  // }
}
