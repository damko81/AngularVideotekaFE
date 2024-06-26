import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthenticationService } from './auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string = "";
  public password : string = "";
  public errorMessage : string = 'Invalid Credentials';
  public successMessage: string = "";
  public invalidLogin: boolean = false;
  public loginSuccess: boolean = false;
  public authLoginSuccess: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService) {   }

  ngOnInit() {
     this.username = this.cookieService.get("username");
  }

  handleLoginAuth() {
      this.authenticationService.authenticationService(this.username, this.password).subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.authLoginSuccess = true;
      this.authenticationService.setAuthLoginSuccess(true);
      this.successMessage = 'Login Successful.';
      this.router.navigate(['/movie']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });      
  }

  Login() {
    //Preverimo, ali gre za autorizirano osebo in ta zmaga.
    this.handleLoginAuth();
    //Če ni avtorizirana, preverimo, če je med registriranimi uporabniki
    if(!this.authLoginSuccess){
          let bodyData = {
            username: this.username,
            password: this.password,
          }; 
          this.http.post(`http://localhost:8080/users/login`, bodyData).subscribe(  (resultData: any) => {
              console.log(resultData);
              this.authenticationService.registerSuccessfulLogin(this.username, this.password)
              this.cookieService.set("id", resultData.id);
              this.cookieService.set("name", resultData.name);
              this.cookieService.set("passwordEncr", resultData.password);
              this.invalidLogin = false;
              this.loginSuccess = true;
              this.successMessage = 'Login Successful.';
              this.router.navigate(['/movie']); 
            },
            (error: HttpErrorResponse) => {
              this.invalidLogin = true;
              this.loginSuccess = false;
              this.errorMessage = "Incorrect Username and Password not match";
            }
          );
     }
    }

//Obsolete: Vrača txt sporočilo in ne objekta Users
  Loginmsg() {
    //Preverimo, ali gre za autorizirano osebo in ta zmaga.
    this.handleLoginAuth();
    //Če ni avtorizirana, preverimo, če je med registriranimi uporabniki
    if(!this.authLoginSuccess){

          let bodyData = {
            username: this.username,
            password: this.password,
          }; 
          this.http.post(`http://localhost:8080/users/loginmsg`, bodyData).subscribe(  (resultData: any) => {
          console.log(resultData);
  
          if (resultData.message == "Username not exits"){
        
            this.invalidLogin = true;
            this.loginSuccess = false;
            this.errorMessage = "Username not exits";
          }
          else if(resultData.message == "Login Success") {
              this.authenticationService.registerSuccessfulLogin(this.username, this.password)
              this.invalidLogin = false;
              this.loginSuccess = true;
              this.successMessage = 'Login Successful.';
              this.router.navigate(['/movie']);     
          }
          else
          {
            this.invalidLogin = true;
            this.loginSuccess = false;
            this.errorMessage = "Incorrect Username and Password not match";
          }
        });
     }
    }


}