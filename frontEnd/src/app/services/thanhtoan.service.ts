import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThanhtoanService {
  private apiUrl = 'http://localhost:8080/rest/thanhtoan';
  constructor(private http: HttpClient) { }
  // Lấy lịch sử thanh toán của hội viên theo mã hội viên
  // getLichSuThanhToanHoiVien(maHV: string): Observable<any[]> {
  //   let url = `${this.apiUrl}/lichsuHV/${maHV}`;
  //   return this.http.get<any[]>(url);  // Gửi GET request
  // }

    // Gọi API lấy lịch sử thanh toán của hội viên
    getLichSuThanhToan(maHV: string, page: number , size: number ): Observable<any> {
      let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());
  
      // Thực hiện GET request
      return this.http.get<any>(`${this.apiUrl}/lichsuHV/${maHV}`, { params });
    }
    ThanhToanThuCong(thanhtoan:any):Observable <any> {
      return this.http.post<any>(this.apiUrl, thanhtoan);
    }
}
