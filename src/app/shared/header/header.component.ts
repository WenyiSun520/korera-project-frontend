import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  currentProject: string = '';
  @Input() user: any;
  isProfileShowed: boolean = false;

  constructor(
    private authService: AuthService,
    public jwtHelper: JwtHelperService
  ) {}

  toggleProfile() {
    if (this.authService.isAuthenticated()) {
    this.isProfileShowed = !this.isProfileShowed;
    console.log(this.user)
    }
  }
}
