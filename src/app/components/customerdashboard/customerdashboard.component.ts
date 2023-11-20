import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  gdprData: any; // Declare gdprData variable
  gdprForm: FormGroup;

// JSON: any;
 
// note: any;
  constructor(
    private route: ActivatedRoute,
    private GetcustomerdetailsService: GetcustomerdetailsService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.gdprForm = this.fb.group({
      display: false,
      delete: false,
      hold: false
    });
  }

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
        this.GetcustomerdetailsService.getGDPR(userId).subscribe((GDPRData) => {
          this.gdprData = GDPRData;
          console.log("GDPR data:", GDPRData);
          if (this.gdprData) {
            this.gdprForm.setValue({
              display: this.gdprData.display,
              delete: this.gdprData.delete,
              hold: this.gdprData.hold
            });
          }
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
  
  
  // Update GDPR preferences
  updateGDPR(updateType: string): void {
    if (!this.gdprForm) {
      console.error('GDPR form not available.');
      return;
    }

    const isChecked = this.gdprForm.get(updateType)?.value;

    this.gdprForm.disable();

    const updateValue = isChecked ? 0 : 1;

    this.GetcustomerdetailsService.updateGDPR(this.gdprData.customeR_ID, updateType, updateValue).subscribe({
      next: (response) => {
        this.gdprData[updateType] = updateValue === 1;
        console.log("GDPR updated for user", this.gdprData.customeR_ID, "with updateType", updateType, "and updateValue", updateValue, response);

        Swal.fire({
          title: 'GDPR Updated!',
          text: 'GDPR preferences have been successfully updated.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          didClose: () => {
            location.reload();
          }
        });
        
      },
      error: (error) => {
        console.error('Error updating GDPR:', error);

        Swal.fire({
          title: 'Error Updating GDPR',
          text: 'There was an error updating GDPR preferences.',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      },
      complete: () => {
        this.gdprForm.enable();
      }
    });
  }
}