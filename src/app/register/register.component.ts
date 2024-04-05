import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string ="";
  username: string ="";
  password: string ="";

  constructor(private http: HttpClient, private router: Router){ }

  save(){
    let bodyData = {
      "name" : this.name,
      "username" : this.username,
      "password" : this.password
    };
    this.http.post(`http://localhost:8080/users/save`,bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("User Registered Successfully");
        this.router.navigate(['/login']);  
    });
  }

}
