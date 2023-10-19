import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  showPassword: boolean = false;
  signUpForm = this.formBuilder.group({
    username: ['', Validators.required],
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    passwords: ['', Validators.required],
    confirmed: ['', Validators.required],
  });

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  handleSubmit() {
    console.warn(this.signUpForm.value);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  navigateToLogIn() {
    this.router.navigate(['login']);
  }
}
