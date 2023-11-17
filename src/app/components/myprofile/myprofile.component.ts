import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetcustomerdetailsService } from 'src/app/services/getcustomerdetails.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';





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
  public Contact!:string;
  public Id!:string;
   
  // public Id: string = "";
  constructor(private auth: AuthService, private userStore: UserStoreService, private route: ActivatedRoute, private modalService: NgbModal,private GetcustomerdetailsService: GetcustomerdetailsService,private http: HttpClient) { }
 
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
      console.log('Contact Store:', val);
      const contactnoFromToken = this.auth.getcontactnoFromToken();
      this.Contact = val || contactnoFromToken;

      console.log('Contact_No From Store:', this.Contact );
    });


    this.userStore.getIdFromStore()
    .subscribe(val=>{
      console.log('Id Store:', val);
      const IdFromToken = this.auth.getIdFromToken();
      this.Id = val || IdFromToken;

      console.log('Id From Store:', this.Id );
    });

  }



  updateProfile() {
    // Prepare the updated user data to send to the server
    const updatedUser = {
      firstName: this.FirstName,
      lastName: this.LastName,
      contact: this.Contact,
      email: this.Email,
    };
  
    // Assuming 'id' is the identifier of the user you want to update
    const Id = parseInt(this.Id, 10); // Use parseInt to convert string to number
  
    // Call the updateUserProfile method with the user ID and updated data
    this.GetcustomerdetailsService.updateUserProfile(Id, updatedUser)
      .subscribe(
        response => {
          // Handle the response from the server if needed
          console.log('Update successful:', response);
           // Show SweetAlert success message
        this.showSuccessAlert();
        },
        error => {
          // Handle the error if the update fails
          console.error('Update failed:', error);
  
          if (error instanceof HttpErrorResponse) {
            // Handle HTTP errors (status codes) differently if needed
            if (error.status === 415) {
              console.error('Unsupported Media Type - Check request format.');
            } else {
              console.error('Other HTTP error:', error.statusText);
            }
          } else {
            // Handle other types of errors
            console.error('Unexpected error:', error);
          }
        }
      );
  }

  showSuccessAlert() {
    // Use SweetAlert2 to show a success message
    Swal.fire({
      title: 'Update Successful',
      text: 'Your profile has been updated successfully!',
      icon: 'success',
      showConfirmButton: false,
      didClose: () => {
        location.reload();
      }
    });
  }
  
  
}  
