import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  @Input() user: any = {};
  @Output() isProfileShowed = new EventEmitter<boolean>();

  constructor(private authService: AuthService, private router: Router) {}

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isProfileShowed.emit(false);
  }

}
