import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<Users[]>{
    return this.http.get<Users[]>(`${this.apiServerUrl}/users/all`);
  }

  public updateUsers(user: Users): Observable<Users>{
    return this.http.put<Users>(`${this.apiServerUrl}/users/update`,user);
  }

  public deleteUsers(id?: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/users/delete/${id}`);
  }

}
