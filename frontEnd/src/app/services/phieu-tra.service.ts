import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhieuTraDTO } from '../models/phieu-tra-dto';

@Injectable({
  providedIn: 'root'
})
export class PhieuTraService {
  private apiUrl = 'http://localhost:8080/phieuTra'; // Replace with your actual backend URL

  constructor(private http: HttpClient) { }
  createPhieuTra(handledBooks: PhieuTraDTO[]): Observable<any> {
    return this.http.post(this.apiUrl+'/create', handledBooks);
  }
  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  findChiTietPhieuTraById(maPT: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/findChiTietPhieuTraByPtId`, {
      params: { maPT: maPT.toString() }
    });
  }


}
