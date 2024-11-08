import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KhoService {
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080/rest/kho';
  public kho={
    maKho:1,
    tenKho: "",
    diaDiem: ""
  }
  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  addKho(kho: any): Observable<any> {  
    return this.http.post<any>(this.apiUrl, kho);
  }
  deleteKho(makho: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${makho}`);
  }
}
