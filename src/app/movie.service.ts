import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './movie';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MovieService{
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getMovies(): Observable<Movie[]>{
      return this.http.get<Movie[]>(`${this.apiServerUrl}/movie/all`);
  }

  public addMovie(movie: Movie): Observable<Movie>{
      return this.http.post<Movie>(`${this.apiServerUrl}/movie/add`,movie);
  }

  public updateMovie(movie: Movie): Observable<Movie>{
      return this.http.put<Movie>(`${this.apiServerUrl}/movie/update`,movie);
  }

  public deleteMovie(movieid?: number): Observable<void>{
      return this.http.delete<void>(`${this.apiServerUrl}/movie/delete/${movieid}`);
  }

  public deleteMovieByDisc(disc: string): Observable<void>{
      let discTmp: string = disc.replace(/\\/, '!');
      return this.http.delete<void>(`${this.apiServerUrl}/movie/deleteMovieByDisc/${discTmp}`);
  }

  public loadMovies(disc: string): Observable<HttpEvent<any>>{
    let discTmp: string = disc.replace(/\\/, '!');
    return this.http.post<HttpEvent<any>>(`${this.apiServerUrl}/movie/load`,discTmp);  
  }

}