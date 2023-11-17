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
  public firstName!:string;
  public LastName!:string;
  public Email!:string;
  public Contact!:string;
  public Id!:string;
  user: any; // Define a user variable to store the fetched user details
   
  // public Id: string = "";
  constructor(private auth: AuthService, private userStore: UserStoreService, private route: ActivatedRoute, private modalService: NgbModal,private GetcustomerdetailsService: GetcustomerdetailsService,private http: HttpClient) { }
  ngOnInit() {
    this.userStore.getIdFromStore().subscribe(val => {
      console.log('Id Store:', val);
      const IdFromToken = this.auth.getIdFromToken();
      this.Id = val || IdFromToken;

      console.log('Id From Store:', this.Id);

      // Move the following code inside the subscribe block to ensure Id is assigned before using it
      this.GetcustomerdetailsService.getBOUSERDetails(this.Id).subscribe((data) => {
        this.user = data;
        console.log(data);
      });
    });
  }
  

  updateProfile() {
    console.log("username",this.user.firstName);
    // Prepare the updated user data to send to the server
    const updatedUser = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      contact: this.user.contact,
      email: this.user.email,
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
