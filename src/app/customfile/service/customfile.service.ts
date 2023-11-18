import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomFile } from '../customfile.model';

@Injectable({
  providedIn: 'root'
})
export class CustomfileService {

  private apiURL = 'http://localhost:3000/customFile';

  constructor(private http: HttpClient) {}

  uploadCustomFile(customFile : any): Observable<any> {

    return this.http.post<any>(`${this.apiURL}`, customFile);
  }

  getCustomFile(): Observable<CustomFile[]> {
    return this.http.get<CustomFile[]>(`${this.apiURL}`);
  }
  getCustomFileById(id: string): Observable<CustomFile> {
    return this.http.get<CustomFile>(`${this.apiURL}/${id}`);
  }

  deleteCustomFile(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }
}

