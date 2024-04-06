import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './auth.service';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {   }

  ngOnInit() {
  }

  handleLoginAuth() {
      this.authenticationService.authenticationService(this.username, this.password).subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.router.navigate(['/movie']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });      
  }

  Login() {
  
    let bodyData = {
      username: this.username,
      password: this.password,
    }; 
        this.http.post(`http://localhost:8080/users/login`, bodyData).subscribe(  (resultData: any) => {
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