import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { SERVER_ADDRESS } from 'src/app/shared/serverAddress';
import { JwtHelperService } from '@auth0/angular-jwt';
import { errorHandler } from 'src/app/shared/errorHandler';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogginedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  private token: any;
  private username: any;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

   authenticate(username: any, passwords: any) {
    this.http
      .post(`${SERVER_ADDRESS}api/auth/authenticate`, {
        username: username,
        password: passwords,
      })
      .subscribe({
        next: (data) => (this.token = data),
        error: (err) => {
          console.log("Error subscribing authenticate event",err)
          catchError(errorHandler);
        },
        complete: () => {
          if (typeof localStorage !== 'undefined' && localStorage !== null) {
            localStorage.setItem('token', this.token.token);
            // this.username = username + '';
            this.isLogginedInSubject.next(true);
            // console.log('authenticate(): ' + this.username);
          } else {
            console.log('localstorage is not availble');
          }
        },
      });
  }

  isLoggedIn():Observable<boolean>{
    return this.isLogginedInSubject.asObservable();
  }

  signUp(obj: any) {
    console.log(obj);
    this.http
      .post(`${SERVER_ADDRESS}api/auth/registere`, {
        username: obj.username,
        password: obj.password,
        fname: obj.fname,
        lname: obj.lname,
      })
      .subscribe({
        next: (data) => (this.token = data),
        error: (err) => {
           console.log('Error subscribing register event',err);
          catchError(errorHandler);
        },
        complete: () => {
          if (typeof localStorage !== 'undefined' && localStorage !== null) {
            localStorage.setItem('token', this.token.token);
            // this.username = obj.username + '';
            // console.log('authenticate(): ' + this.username);
            this.isLogginedInSubject.next(true);
          } else {
            console.log('localstorage is not availble');
          }
        },
      });
  }

  isAuthenticated():boolean {
    return (
      localStorage.getItem('token')!== null &&
      !this.jwtHelper.isTokenExpired(localStorage.getItem('token'))
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }
  getUsername() {
    return this.jwtHelper.decodeToken(this.getToken() as string).sub;
  }

  getUser(username: string) {
    // console.log(`Bearer ${this.token.token}`);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()!}`,
    });
    const params = new HttpParams().set('username', username);
    let userRequest = this.http.get(`${SERVER_ADDRESS}api/user/username`, {
      headers: headers,
      params: params,
    });

    return userRequest.pipe(catchError(errorHandler));
  }

  logout() {}
}
