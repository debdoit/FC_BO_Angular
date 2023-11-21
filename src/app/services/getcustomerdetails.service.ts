import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetcustomerdetailsService {

  private apiUrl = 'https://familycentraladminapi.azurewebsites.net/api/UserSearch/customer-details';
  private notesApiUrl = 'https://familycentraladminapi.azurewebsites.net/api/getCustomerNotes/GetCustomerNotes';
  private AddnotesAPIURL = 'https://familycentraladminapi.azurewebsites.net/api/getCustomerNotes/AddCustomerNotes';
  private UpdateAPIURL = 'https://familycentraladminapi.azurewebsites.net/api/User/update-profile/';
  private getAPIURL = 'https://familycentraladminapi.azurewebsites.net/api/User/get-user/';
  private GDPRURL = 'https://familycentraladminapi.azurewebsites.net/api/GDPRCustomer/UpdateGDPRCustomer/';
  private getGDPRURL = 'https://familycentraladminapi.azurewebsites.net/api/GDPRCustomer/';

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
  getGDPR(Id: string): Observable<any> {
    const apiUrl = `${this.getGDPRURL}${Id}`;
    return this.http.get(apiUrl);
  }

  updateGDPR(userId: string, updateType: string, updateValue: number): Observable<any> {
    const apiUrl = `${this.GDPRURL}${userId}`;
  
    // Create an object with the updateType and updateValue
    const requestBody = {
      updateType: updateType,
      updateValue: updateValue
    };
  
    // Set the Content-Type header within the request
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as const, // Specify the responseType here
    };
  
    // Use the httpOptions and stringify the requestBody when making the request
    return this.http.put(apiUrl, requestBody, httpOptions);

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
