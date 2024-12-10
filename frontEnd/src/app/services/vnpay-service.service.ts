import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VnpayServiceService {

  private apiUrl = 'http://localhost:8080/api/paymen';  // URL backend của bạn

  constructor(private http: HttpClient) {}
  
  // Hàm gửi yêu cầu POST
  createPaymentUrl(userName:string,amount: string): Observable<string> {
    // Dữ liệu gửi đi trong body yêu cầu
    const body = new URLSearchParams();
    body.set('userName',userName)
    body.set('amount', amount);
    // Đặt header Content-Type là application/x-www-form-urlencoded
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  
    // Gửi yêu cầu POST tới backend, chỉ rõ responseType là 'text'
    return this.http.post(this.apiUrl+"/vnpay/naptien", body.toString(), { 
      headers: headers, 
      responseType: 'text'  // Thay đổi ở đây để phản hồi là chuỗi (text)
    });
  }

}
