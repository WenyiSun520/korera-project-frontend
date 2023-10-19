import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showPassword: boolean = false;
  ErrorMsg:string = "";
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    passwords: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private authService: AuthService) {}

  handleSubmit() {
    this.authService
      .authenticate(
        this.loginForm.value.username,
        this.loginForm.value.passwords
      )
    if(this.authService.isAuthenticated()){
    this.router.navigate(['resource-list']);
    }else{
      this.ErrorMsg = "Can't logg you in. Please try again"
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  navigateToSignUp() {
    this.router.navigate(['signup']);
  }
}
