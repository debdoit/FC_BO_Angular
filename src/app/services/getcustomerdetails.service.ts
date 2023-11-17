import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetcustomerdetailsService {

  private apiUrl = 'https://localhost:7127/api/UserSearch/customer-details';
  private notesApiUrl = 'https://localhost:7127/api/getCustomerNotes/GetCustomerNotes';
  private AddnotesAPIURL = 'https://localhost:7127/api/getCustomerNotes/AddCustomerNotes';
  private UpdateAPIURL = 'https://localhost:7127/api/User/update-profile/';
  private getAPIURL = 'https://localhost:7127/api/User/get-user/';

  constructor(private http: HttpClient) {}

  getUserDetails(userId: string): Observable<any> {
    const url = `${this.apiUrl}?id=${userId}`;
    return this.http.get(url);
  }

  getCustomerNotes(customerId: string): Observable<any> {
    const notesUrl = `${this.notesApiUrl}?customerId=${customerId}`;
    return this.http.get(notesUrl);
  }

  getBOUSERDetails(Id: string): Observable<any> {
    const apiUrl = `${this.getAPIURL}${Id}`;
    return this.http.get(apiUrl);
  }
  

  AddCustomerNotes(data: { customerId: string, notes: string }): Observable<any> {
    const addnotesURL = `${this.AddnotesAPIURL}?customerId=${data.customerId}`;
    return this.http.post(addnotesURL, data,{ responseType: 'text' });
  }

  updateUserProfile(id: number, updatedUser: any): Observable<any> {
    const url = `${this.UpdateAPIURL}${id}`;

    // Set the Content-Type header within the request
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    // Convert the updatedUser object to a JSON string
    const updatedUserString = JSON.stringify(updatedUser);

    // Use the httpOptions when making the request
    return this.http.put(url, updatedUserString, httpOptions);
  }
  


}
