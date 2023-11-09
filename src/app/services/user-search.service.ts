import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserSearchService {
  private apiUrl = 'https://localhost:7127/api/UserSearch/search';
  private apiTPAUrl = 'https://localhost:7127/api/UserSearch/financial-planners';


  constructor(private http: HttpClient) {}

  searchUsers(searchQuery: string) {
    return this.http.get(`${this.apiUrl}?searchQuery=${searchQuery}`);
  }
  searcFhUsers(searchFQuery: string) {
    return this.http.get(`${this.apiTPAUrl}?searchQuery=${searchFQuery}`);
  }
}
