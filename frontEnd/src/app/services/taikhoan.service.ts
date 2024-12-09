import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaikhoanService {
  private apiUrl = 'http://localhost:8080/rest/taikhoan';
  constructor(private http: HttpClient) { }
  changePassword(userName: string, oldPassword: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      userName,
      oldPassword,
      newPassword,
    };

    return this.http.put(this.apiUrl+'/change-password', body, {headers, responseType: 'text' as 'json' });
  }
}
