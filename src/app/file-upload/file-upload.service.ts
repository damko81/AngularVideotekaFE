import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,
              private cookieService: CookieService) { }

  upload(file: File): Observable<HttpEvent<any>> {
    let fileName:string = this.cookieService.get("username") + '_' + file.name;
    const formData: FormData = new FormData();

    formData.append('file', file, fileName);

    const req = new HttpRequest('POST', `${this.baseUrl}/file/upload`, formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  export(): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseUrl}/file/export`, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/file/files`);
  }

  getDownloadFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/file/downloadfiles`);
  }

  public loadMoviesFromXml(name: string): Observable<HttpEvent<any>>{
    const req = new HttpRequest('POST', `${this.baseUrl}/file/loadMoviesFromXml/${name}`,{
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public delete(name: string): Observable<HttpEvent<any>>{
    return this.http.delete<HttpEvent<any>>(`${this.baseUrl}/file/delete/${name}`);
  }

}
