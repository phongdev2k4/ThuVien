import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TacgiaService {
  private apiUrl = 'http://localhost:8080/rest/tacgia';

  constructor(private http: HttpClient) {}
  public TacGia: any = {
    maTacGia: '',
    tenTacGia: '',
    ngaySinh: '',
    quocGia: ''
  };

  getTacGia(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTacGia(tacgia: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, tacgia);
  }

  deleteTacGia(maTacGia: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${maTacGia}`);
  }
}
