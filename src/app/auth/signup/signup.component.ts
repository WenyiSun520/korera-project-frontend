import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  submitMsg: string = '';
  showMessage: boolean = false;
  showPassword: boolean = false;
  signUpForm = this.formBuilder.group({
    username: ['', Validators.required],
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    passwords: ['', Validators.required],
    confirmed: ['', Validators.required],
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private authService:AuthService) {}

  handleSubmit() {
    if (this.signUpForm.value.passwords !== this.signUpForm.value.confirmed) {
      this.showMessage = true;
      this.submitMsg = 'Passwords unmatched!';
      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    }else{
      this.authService.signUp(this.signUpForm.value)
    }
    // console.warn(this.signUpForm.value);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  navigateToLogIn() {
    this.router.navigate(['login']);
  }
}
