import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/services/user-store.service';
import { ToastrService } from 'ngx-toastr';
// import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  public resetPasswordEmail! : string;
  public isValidEmail! : boolean;
  

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toastr: ToastrService,private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],


      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "fa-eye" : "fa-eye-slash";
    this.type = this.isText ? "text" : "password";
  }

  onLogin() {
    if (this.loginForm.valid) {
      // this.toastr.info("Logging in..."); // Show loading indicator message
      // alert("Login Successful !");
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
         
          console.log('Success callback executed');
          this.auth.storeToken(res.token);
          const tokenPayload = this.auth.decodedToken();
          console.log("token : ",tokenPayload);
          this.userStore.setFullNameFromStore(tokenPayload.unique_named);
          this.userStore.setRoleForStore(tokenPayload.role);
          
          this.loginForm.reset();
          this.router.navigate(['home']).then(() => {
            window.location.reload();
          });
          alert("Login Successful");
          this.toastr.info("Login Successful", "Success", { timeOut: 5000});

          
        },
        error: (err) => {
          this.toastr.error("Something Went Wrong"); // Remove the extra title:""
          console.log('Error callback executed');
          console.error(err); // Log the error for debugging
        }
        
      });
    } else {
      console.log("Form is not valid");
      this.toastr.info("Fill all the required fields"); // Show loading indicator message
    }
  }

  checkValidEmail(event:string){
    const value = event;
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;

  }

  confirmToSend(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
      console.log(this.resetPasswordEmail);
      this.resetPasswordEmail = "";
      const buttonRef = document.getElementById("closeBtn");
      buttonRef?.click();
      //API call
    }
  }
 
}
