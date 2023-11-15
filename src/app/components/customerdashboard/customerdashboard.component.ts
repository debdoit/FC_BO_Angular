import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { UserStoreService } from 'src/app/services/user-store.service';
import Swal from 'sweetalert2';

import { GetcustomerdetailsService } from 'src/app/services/getcustomerdetails.service';
// import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.css']
})

export class CustomerDashboardComponent implements OnInit {
  user: any; // Define a user variable to store the fetched user details
  shownotes: any; // Define a 'notes' property to store the data
  notes: string = '';
// JSON: any;
 
// note: any;
  constructor(
    private route: ActivatedRoute,
    private GetcustomerdetailsService: GetcustomerdetailsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('userId');
      if (userId) {
        this.GetcustomerdetailsService.getUserDetails(userId).subscribe((data) => {
          this.user = data; // Assign the fetched user details to the user variable
          console.log(data);
        });
         // Fetch customer notes
         this.GetcustomerdetailsService.getCustomerNotes(userId).subscribe((notesData) => {
          this.shownotes = notesData; // Assign the fetched notes to the notes variable
          console.log("note data :",notesData); 
         
        });

      }
    });
  }

  getInitials(name: string): string {
    const words = name.split(' ');
    const initials = words.map((word) => word[0]).join('');
    return initials.toUpperCase(); // Convert to uppercase
  }
  addNotes() {
    console.log('Before condition - Value of this.notes:', this.notes);
    console.log('Before condition - Type of this.notes:', typeof this.notes);
  
    // Check if notes are not empty before sending the request
    if (this.user?.id) {
      const data = {
        customerId: this.user?.id,
        // console.log(customerId);
        notes: this.notes
      };
      console.log("debasish",data.notes);
  
      // Send the data to the service method
      // debugger;
      this.GetcustomerdetailsService.AddCustomerNotes(data).subscribe({
        next: (response) => {
          // Handle the success response from the API (if needed)
          console.log('Notes added successfully', response);
           // Show SweetAlert success message
           Swal.fire({
            icon: 'success',
            title: 'Notes added successfully!',
            showConfirmButton: false,
            didClose: () => {
              location.reload();
            }
            // timer: 1500 // You can uncomment and adjust the timer as needed
          });
          
         
        },
        error: (error) => {
          // Handle the error response from the API (if needed)
          console.error('Error adding notes:', error);
          console.log(data)
        }
      });
    } else {
      // Show an error message if notes are empty or not a string
      console.log('Invalid notes:', this.notes);
    }
  }
  
  
  
  

 

  alert(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'GDPR will be updated.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      // input: 'text',
      // inputPlaceholder: 'Enter your reason here',
    }).then((result) => {
      if (result.isConfirmed) {
        const reason = result.value;
        if (reason) {
          // Perform the API request to update GDPR with the reason provided
          fetch('https://localhost:7127/api/GDPRCustomer/UpdateGDPRCustomer/', {
            method: 'POST', // You may need to use the appropriate HTTP method
            headers: {
              'Content-Type': 'application/json', // Adjust the content type as needed
            },
            body: JSON.stringify({ reason: reason }), // Pass the reason as JSON data
          })
            .then((response) => {
              if (response.ok) {
                // Successful update, you can handle the response as needed
                location.reload();
              } else {
                // Handle the API error
                console.error('API request failed');
                Swal.fire('Error', 'Failed to update GDPR.', 'error');
              }
            })
            .catch((error) => {
              // Handle network or other errors
              console.error(error);
              Swal.fire('Error', 'Failed to update GDPR.', 'error');
            });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Please enter a reason for the update.',
            icon: 'error',
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
          
          
        }
      } else {
        // User clicked "Cancel," no action needed
        location.reload();
      }
    });

  }


  

}
