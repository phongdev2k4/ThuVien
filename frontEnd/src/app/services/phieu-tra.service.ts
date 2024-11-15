import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhieuTraService {
  private apiUrl = 'http://localhost:8080/phieuTra'; // Replace with your actual backend URL

  constructor(private http: HttpClient) { }
  createPhieuTra(maNV: string, maVach: string[]): Observable<any> {
    const params = new HttpParams()
    .set('maNV', maNV)  
    .set('maVach', maVach.join(','));
    return this.http.post(`${this.apiUrl}/create`, params);
  }



}
