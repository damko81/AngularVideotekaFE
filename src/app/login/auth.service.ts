import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: string = "";
  public password: string = "";
  public authLoginSuccess: boolean = false;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  authenticationService(username: string, password: string) {
    return this.http.get(`http://localhost:8080/movie/basicauth`,
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
      }))
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username: string, password: string) {
    let basicAuthToken = this.createBasicAuthToken(username, password);
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, basicAuthToken);
    this.cookieService.set("username", username);
    this.cookieService.set("password", password);
  }

  setAuthLoginSuccess(authLoginSuccess: boolean){
    this.authLoginSuccess = authLoginSuccess;
    if(authLoginSuccess){this.cookieService.set('authLoginSuccess', 'T');}
    else{this.cookieService.set('authLoginSuccess', 'F');}
    
  }

  getIt() {
    return sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.cookieService.delete("id");
    this.cookieService.delete("name");
    this.cookieService.delete("username");
    this.cookieService.delete("password");
    this.cookieService.delete("passwordEncr");
    this.cookieService.delete('authLoginSuccess');
    this.authLoginSuccess = false;
    this.username = "";
    this.password = "";
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
}