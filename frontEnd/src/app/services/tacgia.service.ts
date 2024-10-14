import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TacGia } from '../models/tacgia.model';

@Injectable({
  providedIn: 'root'
})
export class TacgiaService {
  private apiUrl = 'http://localhost:8080/rest/tacgia';

  constructor(private http: HttpClient) {}
  public tacGia: TacGia = {  // Sử dụng interface TacGia
    maTacGia: '',
    tenTacGia: '',
    ngaySinh:new Date(),
    quocGia: ''
  };

  getTacGia(): Observable<TacGia[]> {  // Sử dụng TacGia[]
    return this.http.get<TacGia[]>(this.apiUrl);
  }

  addTacGia(tacgia: TacGia): Observable<TacGia> {  // Sử dụng TacGia
    return this.http.post<TacGia>(this.apiUrl, tacgia);
  }

  deleteTacGia(maTacGia: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${maTacGia}`);
  }
}
