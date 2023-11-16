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
  public Username!:string;
  public FirstName!:string;
  public LastName!:string;
  public Email!:string;
  public Contact_No!:string;
  public Id!:string;

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

    this.userStore.getUsernameFromStore()
    .subscribe(val=>{
      console.log('Username from store:', val);

      const UsernameFromToken = this.auth.getUsernameFromToken();
      this.Username = val || UsernameFromToken;

      console.log('Username From Store:', this.Username );
    });

   

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      console.log('Role Store:', val);
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;

      console.log('Role From Store:', this.role );
    });


    this.userStore.getEmailFromStore()
    .subscribe(val=>{
      console.log('Email Store:', val);
      const EmailFromToken = this.auth.getEmailFromToken();
      this.Email = val || EmailFromToken;

      console.log('Email From Store:', this.Email );
    });


    this.userStore.getLastnameFromStore()
    .subscribe(val=>{
      console.log('Lastname Store:', val);
      const LastnameFromToken = this.auth.getLastnameFromToken();
      this.LastName = val || LastnameFromToken;

      console.log('Lastname From Store:', this.LastName );
    });



    this.userStore.getFirstnameFromStore()
    .subscribe(val=>{
      console.log('Firstname Store:', val);
      const FirstnameFromToken = this.auth.getFirstnameFromToken();
      this.FirstName = val || FirstnameFromToken;

      console.log('Firstname From Store:', this.FirstName );
    });


    this.userStore.getContact_NoFromStore()
    .subscribe(val=>{
      console.log('Contact_no Store:', val);
      const contactnoFromToken = this.auth.getcontactnoFromToken();
      this.Contact_No = val || contactnoFromToken;

      console.log('Contact_No From Store:', this.Contact_No );
    });


    this.userStore.getIdFromStore()
    .subscribe(val=>{
      console.log('Id Store:', val);
      const IdFromToken = this.auth.getIdFromToken();
      this.Id = val || IdFromToken;

      console.log('Id From Store:', this.Id );
    });

  }


 

  
}
