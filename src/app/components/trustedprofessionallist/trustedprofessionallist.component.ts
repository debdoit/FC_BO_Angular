




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
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private userSearchService: UserSearchService) {}

  search() {
    this.userSearchService.searcFhUsers(this.searchQuery)
      .subscribe((data: any) => {
        this.users = data;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
}





