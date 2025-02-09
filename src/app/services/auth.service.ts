import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signUpLoad = false;
  signUpReqObj;
  signUpResObj;

  loginLoad = false;
  loginReqObj;
  loginResObj;

  token = null;

  constructor(private http: HttpClient, public router: Router) {}

  login(): any {
    this.loginLoad = true;
    this.http
      .post(environment.apiHost + '/api/v1/login', this.loginReqObj)
      .subscribe(
        (res) => {
          console.log(res);
          this.loginResObj = res;
          localStorage.setItem('token', this.loginResObj.token);
          this.router.navigate(['/dashboard']);
          this.loginLoad = false;
        },
        (err) => {
          console.log(err);
          this.loginLoad = false;
        }
      );
  }

  signUp(): any {
    this.signUpLoad = true;
    this.http
      .post(environment.apiHost + '/api/v1/register', this.signUpReqObj)
      .subscribe(
        (res) => {
          console.log(res);
          this.signUpResObj = res;
          alert(this.signUpResObj.message);
          this.router.navigate(['/login']);
          this.signUpLoad = false;
        },
        (err) => {
          console.log(err);
          this.signUpLoad = false;
        }
      );
  }

  logout(): any {
    this.token = null;
    localStorage.setItem('token', null);
  }

  isUserLoggedIn() {
    // logic
    if (localStorage.getItem('token') !== null) {
      this.token = localStorage.getItem('token');
      return true;
    } else {
      return false;
    }
  }
}
