import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserSearchService } from 'src/app/services/user-search.service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css'],
})
export class CustomerlistComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'rolename', 'email'];
  dataSource = new MatTableDataSource<PeriodicElement>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  searchQuery: string = '';
  users: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  searchAttempted: boolean = false;
  noDataAvailable: boolean = false;

  constructor(private userSearchService: UserSearchService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search() {
    console.log('Search function called');
    console.log('Search query:', this.searchQuery);
    this.searchAttempted = true;

    if (this.isSearchValid()) {
      this.userSearchService.searchUsers(this.searchQuery).subscribe(
        (data: any) => {
          console.log('API response:', data);
          this.users = data;
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator; // Set paginator after data is loaded
          this.dataSource.sort = this.sort; // Set paginator after data is loaded
        },
        (error) => {
          console.error('API error:', error);
        }
      );
    } else {
      console.log('Search query is invalid. Minimum 3 words required.');
    }
  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue; // Set paginator after data is loaded
  }

  isSearchValid(): boolean {
    const letters = this.searchQuery.replace(/\s+/g, '');
    console.log('Actual letter count:', letters.length);
    console.log('Letters:', letters);

    return letters.length >= 3;
  }
}

export interface PeriodicElement {
  id: number;
  firstname: string;
  lastname: string;
  rolename: string;
  email: string;
}
