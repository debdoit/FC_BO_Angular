import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  notes: any; // Define a 'notes' property to store the data
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
          this.notes = notesData; // Assign the fetched notes to the notes variable
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

  alert(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'GDPR will be updated.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      input: 'text',
      inputPlaceholder: 'Enter your reason here',
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


  // handleCheckboxChange(checkbox: HTMLInputElement, value: string) {
  //   if (value === 'delete') {
  //     const isDeleteChecked = checkbox.checked;
  //     if (isDeleteChecked) {
  //       this.showConfirmationWithReason('Are you sure?', 'Please enter the reason for deletion:', 'delete', checkbox);
  //     } else {
  //       this.showConfirmationWithReason('Are you sure?', 'Please enter the reason for Un-deletion:', 'undelete', checkbox);
  //     }
  //   } else if (value === 'hold') {
  //     const isHoldChecked = checkbox.checked;
  //     if (isHoldChecked) {
  //       this.showConfirmationWithReason('Are you sure?', 'Please enter the reason for hold:', 'hold', checkbox);
  //     } else {
  //       this.showConfirmationWithReason('Are you sure?', 'Please enter the reason for unhold:', 'unhold', checkbox);
  //     }
  //   } else if (value === 'display') {
  //     const isDisplayChecked = checkbox.checked;
  //     if (isDisplayChecked) {
  //       this.showConfirmationWithReason('Are you sure?', 'Please enter the reason for Display:', 'display', checkbox);
  //     } else {
  //       this.showConfirmationWithReason('Are you sure?', 'Please enter the reason for Un-Display:', 'undisplay', checkbox);
  //     }
  //   }
  // }
 
  // showConfirmationWithReason(title: string, text: string, action: string, checkbox: HTMLInputElement) {
  //   Swal.fire({
  //     title: title,
  //     text: text,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'OK',
  //     cancelButtonText: 'Cancel',
  //     input: 'text',
  //     inputPlaceholder: 'Reason',
  //     inputValidator: (value) => {
  //       if (!value) {
  //         return 'Please enter a reason';
  //       }
  //     }
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const reason = result.value || '';
  //       this.sendApiRequest(action, reason);
  //     } else {
  //       checkbox.checked = !checkbox.checked;
  //       // Additional logic if needed
  //     }
  //   });
  // }
 
  // sendApiRequest(action: string, reason:string) {
  //   const customerId = '{{ user?.id }}'; // Replace with your customer ID
 
  //   // Replace the URL with your API endpoint
  //   this.http.post('https://localhost:7127/api/GDPRCustomer/UpdateGDPRCustomer', {
  //     action: action,
  //     reason: reason,
  //     customer_id: customerId
  //   }).subscribe(
  //     (response) => {
  //       // Handle the success response
  //       if (response['message'] === 'success') {
  //         Swal.fire({
  //           title: 'Success',
  //           text: 'The request was successful.',
  //           icon: 'success',
  //           confirmButtonText: 'OK'
  //         });
  //         location.reload(); // You might want to refresh the page after success
  //       } else {
  //         Swal.fire({
  //           title: 'Error',
  //           text: 'An error occurred',
  //           icon: 'error',
  //           confirmButtonText: 'OK'
  //         });
  //       }
  //     },
  //     (error) => {
  //       console.error('API request error:', error);
  //       Swal.fire({
  //         title: 'Error',
  //         text: 'An error occurred: ' + error.message,
  //         icon: 'error',
  //         confirmButtonText: 'OK'
  //       });
  //     }
  //   );
  // }

}
