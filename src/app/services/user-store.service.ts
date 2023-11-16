import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private Username$ = new BehaviorSubject<string>("");
  private FirstName$ = new BehaviorSubject<string>("");
  private LastName$ = new BehaviorSubject<string>("");
  private Email$ = new BehaviorSubject<string>("");
  private Contact_No$ = new BehaviorSubject<string>("");
  private Id$ = new BehaviorSubject<string>("");

  constructor() { }

  public getRoleFromStore() {
    return this.role$.asObservable();
  }

  public setRoleForStore(role: string) {
    this.role$.next(role);
  }


  public getUsernameFromStore() {
    return this.Username$.asObservable();
  }

  public setUsernameForStore(Username: string) {
    this.Username$.next(Username);
  }
  public getFirstnameFromStore() {
    return this.FirstName$.asObservable();
  }

  public setFirstnameForStore(FirstName: string) {
    this.FirstName$.next(FirstName);
  }
  public getLastnameFromStore() {
    return this.LastName$.asObservable();
  }

  public setLastnameForStore(LastName: string) {
    this.LastName$.next(LastName);
  }
  public getEmailFromStore() {
    return this.Email$.asObservable();
  }

  public setEmailForStore(Email: string) {
    this.Email$.next(Email);
  }
  public getContact_NoFromStore() {
    return this.Contact_No$.asObservable();
  }

  public setContact_NoForStore(Contact_No: string) {
    this.Contact_No$.next(Contact_No);
  }
  public getIdFromStore() {
    return this.Id$.asObservable();
  }

  public setIdForStore(Id: string) {
    this.Id$.next(Id);
  }


  public getFullNameFromStore() {
    return this.fullName$.asObservable();
  }

  public setFullNameFromStore(fullName: string) {
    this.fullName$.next(fullName);
    
    console.log('Full Name set in UserStoreService:', fullName);
    
  }



  
}
