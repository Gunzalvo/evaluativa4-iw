import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  private url:string = "http://localhost/";
  
  constructor(private http:HttpClient) { }
  
  consultarNotas():Observable<any> {
      return this.http.get(this.url+'backend.php');
  }
}
