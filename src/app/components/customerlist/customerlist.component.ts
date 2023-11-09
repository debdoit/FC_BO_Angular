




import { Component } from '@angular/core';
import { UserSearchService } from 'src/app/services/user-search.service';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent {
  searchQuery: string = '';
  users: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private userSearchService: UserSearchService) {}

  search() {
    this.userSearchService.searchUsers(this.searchQuery)
      .subscribe((data: any) => {
        this.users = data;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
}
