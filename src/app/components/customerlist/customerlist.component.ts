import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserSearchService } from 'src/app/services/user-search.service';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css'],
})
export class CustomerlistComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  searchQuery: string = '';
  users: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  searchAttempted: boolean = false; // Flag to track whether search has been attempted
  noDataAvailable: boolean = false;

  constructor(private userSearchService: UserSearchService) {}

  // search() {
  //   this.userSearchService.searchUsers(this.searchQuery).subscribe((data: any) => {
  //     this.users = data;
  //   });
  // }

  search() {
    console.log('Search function called');
    console.log('Search query:', this.searchQuery);
    this.searchAttempted = true; // Set the flag when the user attempts to search
    this.noDataAvailable = this.users.length === 0;
    if (this.isSearchValid()) {
      this.userSearchService.searchUsers(this.searchQuery).subscribe(
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

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  // ... rest of the elements
];
