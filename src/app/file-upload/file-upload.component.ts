import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  exprFile?: any;
  fileInfos?: Observable<any>;
  deleteFileName?: string | null;
  progress = 0;
  message = '';

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  public delete(name: string): void {
      this.uploadService.delete(name).subscribe(
        (event: any) => {
          this.message = event.message;
          this.fileInfos = this.uploadService.getFiles();
        },
        (err: any) => {
          console.log(err);
          this.message = err.message;
        }
      );
  }  

  loadMoviesFromXml(name: string): void {
    this.uploadService.loadMoviesFromXml(name).subscribe(
      (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
      },
      (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
      }
    );
  }

  export(): void {
    this.progress = 0;
    this.uploadService.export().subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
        }
      },
      (err: any) => {
        console.log(err);
        this.progress = 0;
        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Could not export the file!';
        }
      });  
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        if(this.currentFile.name != 'Filmi.xml'){
          this.message = 'You have to choose file Filmi.xml !';
        }
      else{
        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });
        }
      }
      this.selectedFiles = undefined;
    }
  }

  public onOpenModal(filename: string  | null,mode?: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'delete') {
      this.deleteFileName = filename;
      button.setAttribute('data-target', '#deleteFileModal');
    }
    container?.appendChild(button);
    button.click();

  }

}
