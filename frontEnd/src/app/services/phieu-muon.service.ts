import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinalBorrowedBook } from '../models/final-borrowed-book';
import { Observable } from 'rxjs';
import { BorrowRequestDto } from '../models/borrow-request-dto';
import { XuLiMuonOnlineDTO } from '../models/xu-li-muon-online-dto';
@Injectable({
  providedIn: 'root'
})
export class PhieuMuonService {
  

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080/phieuMuon';
  postPhieuMuon(pmRequest: FinalBorrowedBook): Observable<any> {
    return this.http.post<any>(this.apiUrl, pmRequest);
  }
  getChiTietPhieuMuonByHoiVienId(maHV: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${maHV}`);
  }
  getPhieuMuonByHoiVienId(maHV: string, maVach: string): Observable<any> {
    const params = new HttpParams()
        .set('maHV', maHV)  
        .set('maVach', maVach);
    
    return this.http.get<any>(`${this.apiUrl}/findPhieuMuon`, { params });
}
findAll(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}
findAllDangMuon(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/findAllPhieuMuonDangMuon`);
}
getAllChiTietPhieuMuon(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/getAllChiTietPhieuMuon`);
}

findChiTietPhieuMuonById(maPM: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/findChiTietPhieuMuonByPmId`, {
    params: { maPM: maPM.toString() }
  });
}
postMuonOnline(pmRequest: BorrowRequestDto): Observable<any> {
  return this.http.post<any>(this.apiUrl+'/muonOnline', pmRequest);
}
findAllDangMuonOnline(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/GetAllDangMuonOnline`);
}
findAllMuonOnline(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/GetAllMuonOnline`);
}
getMuonOnlineById(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/muonOnline/${id}`);
}
createPhieuMuonOnline(pmRequest: XuLiMuonOnlineDTO): Observable<any> {
  return this.http.post<any>(this.apiUrl+'/createPhieuMuonByMuonOnline', pmRequest);
}
findChiTietPhieuMuonOnlineById(maPM: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/chiTietMuonOnline/${maPM}`);
   
}
}
