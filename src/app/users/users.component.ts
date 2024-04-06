import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Users } from './users';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  public users?: Users[];

  constructor(private usersService: UsersService) { }

  ngOnInit(){
    this.getUsers();
  }

  public getUsers(): void {
    this.usersService.getUsers().subscribe(
      (response: Users[]) => {
        this.users = response;
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
