import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user: any = {};
  title = 'korera';
  isAuthenticated: boolean = false;
  private token: string = '';

  constructor(
    private authService: AuthService,
    public jwtHelper: JwtHelperService
  ) {}
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    console.log(this.isAuthenticated);
  }
  ngDoCheck() {
    if (this.authService.isAuthenticated()) {
      this.isAuthenticated = this.authService.isAuthenticated();
      this.token = this.authService.getToken()!;
      console.log('auth status changed');
      
    }
  }

  ngAfterContentInit() {
    if (this.token !== '' && this.isAuthenticated == true) {
      //console.log(this.token)
      let decodedToken = this.jwtHelper.decodeToken(this.token);
      // console.log(decodedToken)
      let username = decodedToken.sub;
     //  console.log(username);
      this.authService.getUser(username).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => console.error(err),
        complete: () => console.log('getUser() completed!'),
      });
      console.log(this.user);
    }
  }
}
