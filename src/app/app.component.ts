import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user: any = {};
  title = 'korera';
  isLoggedIn: Observable<boolean>;
  // private token: string = '';

  constructor(
    private authService: AuthService,
    public jwtHelper: JwtHelperService
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
     this.isLoggedIn.subscribe((value) => {
       if (value === true) {
        //  console.log('in app component');
        //  console.log(value);
         let token = this.authService.getToken()!;
         //console.log(this.token)
         let decodedToken = this.jwtHelper.decodeToken(token);
         // console.log(decodedToken)
         let username = decodedToken.sub;
         //  console.log(username);
         this.authService.getUser(username).subscribe({
           next: (data) => {
             this.user = data;
           },
           error: (err) => console.error(err),
           //complete: () => console.log('getUser() completed!'),
         });
       }
     });
  }
}
