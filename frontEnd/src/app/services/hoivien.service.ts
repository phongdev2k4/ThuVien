import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HoiVien } from '../models/hoivien.model';
@Injectable({
    providedIn: 'root'
  })
  export class HoiVienService {
    private apiUrl = 'http://localhost:8080/rest/hoivien';
  
    constructor(private http: HttpClient) {}
    public hoiVien: HoiVien = {  // Sử dụng interface HoiVien
      maHV: "",
      hoTen:"",
      email:"",
      soDienThoai: "",
      tinhTrang: "",
      matKhau: "",
      diaChi: "",
      tienNap: 0
    };
  
    getHoiVien(): Observable<HoiVien[]> {  // Sử dụng HoiVien[]
      return this.http.get<HoiVien[]>(this.apiUrl);
    }
    findAll(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }
    addHoiVien(hoivien: HoiVien): Observable<HoiVien> {  // Sử dụng TacGia
      return this.http.post<HoiVien>(this.apiUrl, hoivien);
    }
  
    deleteHoiVien(maHV: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${maHV}`);
    }

    searchByHoTen(name: string): Observable<HoiVien[]> {
      return this.http.get<any[]>(`${this.apiUrl}/search?name=${name}`);
    }
    findById(maHV: string): Observable<HoiVien> {
      return this.http.get<HoiVien>(`${this.apiUrl}/${maHV}`);
    }
  }