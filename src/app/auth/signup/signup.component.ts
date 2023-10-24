import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  isLoggedIn: Observable<boolean>;

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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.isLoggedIn = authService.isLoggedIn();
  }

  handleSubmit() {
    if (this.signUpForm.value.passwords !== this.signUpForm.value.confirmed) {
      this.showErrorMsg('Passwords unmatch!');
    } else {
      this.authService.signUp(this.signUpForm.value);
      this.isLoggedIn.subscribe((value) => {
        if (value) {
          this.router.navigate(['resource-list']);
        } else {
          this.showErrorMsg("Can't sign you up. Please try again!");
        }
      });
    }
  }

  showErrorMsg(msg: string) {
    this.showMessage = true;
    this.submitMsg = msg;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  navigateToLogIn() {
    this.router.navigate(['login']);
  }
}
