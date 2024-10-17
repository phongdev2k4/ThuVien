import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TheLoai } from '../models/theloai.model';

@Injectable({
  providedIn: 'root'
})
export class TheloaiService {
  private apiUrl = 'http://localhost:8080/rest/theloai';

  constructor(private http: HttpClient) {}
  public theLoai: TheLoai = { 
    maTheLoai:"",
    tenTheLoai:"",
    moTa:""
  };

  getTheLoai(): Observable<TheLoai[]> {  
    return this.http.get<TheLoai[]>(this.apiUrl);
  }

  addTheLoai(theloai: TheLoai): Observable<TheLoai> {  
    return this.http.post<TheLoai>(this.apiUrl, theloai);
  }

  deleteTheLoai(maTheLoai: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${maTheLoai}`);
  }
}
