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
  public editUsers?: Users | null;
  public deleteUsers?: Users | null;

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

  public onDeleteUsers(id?: number): void{
    this.usersService.deleteUsers(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(user: Users | null, mode?: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addUsersModal');
    }
    if (mode === 'edit') {
      this.editUsers = user;
      button.setAttribute('data-target', '#updateUsersModal');
    }
    if (mode === 'delete') {
      this.deleteUsers = user;
      button.setAttribute('data-target', '#deleteUsersModal');
    }
    container?.appendChild(button);
    button.click();

  }

}
