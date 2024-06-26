import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from './movie/movie.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpInterceptorService } from './http-interceptor.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MenuComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    UsersComponent,
    FileUploadComponent
  ],
  imports: [
    MatProgressBarModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
      
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
