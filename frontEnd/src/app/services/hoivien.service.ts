import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HoiVien } from '../models/hoi-vien';

@Injectable({
  providedIn: 'root'
})
export class HoivienService {
  private apiUrl = 'http://localhost:8080/hoiVien'; 
  constructor(private http: HttpClient) { }
  searchByHoTen(name: string): Observable<HoiVien[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?name=${name}`);
  }
  findById(maHV: string): Observable<HoiVien> {
    return this.http.get<HoiVien>(`${this.apiUrl}/${maHV}`);
  }
  
}
