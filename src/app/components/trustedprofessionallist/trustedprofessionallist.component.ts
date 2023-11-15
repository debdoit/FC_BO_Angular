




import { Component } from '@angular/core';
import { UserSearchService } from 'src/app/services/user-search.service';


@Component({
  selector: 'app-trustedprofessionallist',
  templateUrl: './trustedprofessionallist.component.html',
  styleUrls: ['./trustedprofessionallist.component.css']
})
export class TrustedprofessionallistComponent {
  searchQuery: string = '';
  users: any[] = [];
  currentPage: number = 1; // Current page
  pageSize: number = 10; // Items per page
  searchAttempted: boolean = false; // Flag to track whether search has been attempted
  noDataAvailable: boolean = false;

  constructor(private userSearchService: UserSearchService) {}

  // search(): void {
  //   if (this.isSearchValid()) {
  //   this.userSearchService.searcFhUsers(this.searchQuery)
  //     .subscribe((data: any) => {
  //       this.users = data;
  //     });
  //   }
  // }

  search() {
    console.log('Search function called');
    console.log('Search query:', this.searchQuery);
    this.searchAttempted = true; // Set the flag when the user attempts to search
    this.noDataAvailable = this.users.length === 0;
    if (this.isSearchValid()) {
      this.userSearchService.searcFhUsers(this.searchQuery)
        .subscribe(
          (data: any) => {
            console.log('API response:', data);
            this.users = data;
          },
          error => {
            console.error('API error:', error);
          }
        );
    } else {
      console.log('Search query is invalid. Minimum 3 words required.');
      // Optionally, you can display a warning message to the user
    }
  }
  

  isSearchValid(): boolean {
    // Implement your condition for a minimum of 3 letters here
    const letters = this.searchQuery.replace(/\s+/g, ''); // Remove spaces and count letters
    console.log('Actual letter count:', letters.length);
    console.log('Letters:', letters);
  
    return letters.length >= 3;
  }
  
  
  

  get totalPages(): number {
    return Math.ceil(this.users.length / this.pageSize);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}





