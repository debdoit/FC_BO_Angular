import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetcustomerdetailsService {

  private apiUrl = 'https://localhost:7127/api/UserSearch/customer-details';
  private notesApiUrl = 'https://localhost:7127/api/getCustomerNotes/GetCustomerNotes';

  constructor(private http: HttpClient) {}

  getUserDetails(userId: string): Observable<any> {
    const url = `${this.apiUrl}?id=${userId}`;
    return this.http.get(url);
  }

  getCustomerNotes(customerId: string): Observable<any> {
    const notesUrl = `${this.notesApiUrl}?customerId=${customerId}`;
    return this.http.get(notesUrl);
  }
}
