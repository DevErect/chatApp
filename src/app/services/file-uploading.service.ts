import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadingService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File, sender: string, recipient: string, message: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('sender', sender);
    formData.append('recipient', recipient);
    formData.append('message', message);


    return this.http.post(`${environment.apiUrl}/fileUpload`, formData);
  }
}
