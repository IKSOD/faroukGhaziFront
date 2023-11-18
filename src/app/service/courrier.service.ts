import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from'rxjs'
import { CourrierRecu } from '../model/courrier';

@Injectable({
  providedIn: 'root'
})
export class CourrierService {
  apiurlSpring='http://localhost:8081/pfe/courrierRecu';

  constructor(private httpClient  : HttpClient) {


   }

   public  saveCourrier(courrier:CourrierRecu): Observable<CourrierRecu>
   {
     return this.httpClient.post<CourrierRecu>(this.apiurlSpring + "/add",courrier);
   }

   public  getAllCourrier(): Observable<CourrierRecu[]>
   {
     return this.httpClient.get<CourrierRecu[]>(this.apiurlSpring + "/getAll");
   }
}


