import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import validateForm from 'src/app/helpers/validateForm';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signupForm!: FormGroup; // Removed the "!" as it's initialized in ngOnInit

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Added email validation
      password: ['', [Validators.required, Validators.minLength(6)]] // Added password validation
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "fa-eye" : "fa-eye-slash";
    this.type = this.isText ? "text" : "password";
  }

  onSignup() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.auth.signup(this.signupForm.value)
        .subscribe({
          next:(res=>{
            alert(res.message);
            this.signupForm.reset();
            this.router.navigate(['dashboard']);
            
          })
          ,error:(err=>{
            alert(err?.error.message)
          })
        })
         
    } else {
      console.log("Form is not valid");
      validateForm.validateAllFormFields(this.signupForm); // Corrected method call
      alert("Your form is invalid");
    }
  }

  
}
