import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhieuPhat } from '../models/phieu-phat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhieuPhatService {

  private apiUrl = 'http://localhost:8080/phieuPhat'; 
  constructor(private http: HttpClient) { }

  createPhieuPhat(ppRequest: PhieuPhat): Observable<PhieuPhat> {
    return this.http.post<PhieuPhat>(this.apiUrl, ppRequest)
}
getAllPhieuTraViPham(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/PhieuTraViPham`);
}
findAll(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}
getAllChiTietPhieuPhat(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/listChiTietPhieuPhat`);
}
getChiTietPhieuPhatById(maPP:number): Observable<any> {
  const params = new HttpParams()
      .set('maPP', maPP) ;  
  return this.http.get<any>(`${this.apiUrl}/findAllChiTietPhieuPhatSachByPhieuPhat`, { params });
}
}
