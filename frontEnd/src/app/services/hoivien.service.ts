import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HoiVien } from '../models/hoi-vien';

@Injectable({
  providedIn: 'root'
})
export class HoivienService {
  private apiUrl = 'http://localhost:8080/hoiVien'; 
  constructor(private http: HttpClient) { }
  hoiVien: any = {
    maHV: "",
    email: "",
    soDienThoai: "",
    hoTen: "",
    diaChi: "",
    thoiGianDangKy: new Date(),
    tinhTrang: true,
    hinhAnhHV: "",
    tienNap:0,
    taiKhoanHV: {
        userName: "",
        password: "",
        authorities: []
    }
};
  searchByHoTen(name: string): Observable<HoiVien[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?name=${name}`);
  }
  findById(maHV: string): Observable<HoiVien> {
    return this.http.get<HoiVien>(`${this.apiUrl}/${maHV}`);
  }
  findByUsername(username: string): Observable<any> {
    return this.http.get<HoiVien>(`${this.apiUrl+'/username'}/${username}`);
  }
  updateHoiVien(hoivien: any,  file: File | null): Observable<any> {  
    const formData = new FormData();
    formData.append('hoivien', JSON.stringify(hoivien));
        // Chỉ thêm file vào formData nếu nó không phải là null
        if (file) {
          formData.append('file', file);
      }
    return this.http.put(this.apiUrl, formData);
  }
  capnhatHoiVien(userName:string,hoiVien: any, file: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('hoivien', JSON.stringify(hoiVien));
    formData.append('userName', userName);
    // Chỉ thêm file vào formData nếu nó không phải là null
    if (file) {
        formData.append('file', file);
    }
    return this.http.put(this.apiUrl+'/update', formData);
  }
  getHoiVien(): Observable<any[]> {  
    return this.http.get<any[]>(this.apiUrl);
  }
  addHoiVien(hoivien: any,  file: File | null): Observable<any> {  
    const formData = new FormData();
    formData.append('hoivien', JSON.stringify(hoivien));
        // Chỉ thêm file vào formData nếu nó không phải là null
        if (file) {
          formData.append('file', file);
      }
    return this.http.post(this.apiUrl, formData);
  }

  deleteHoiVien(mahoivien: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${mahoivien}`);
  }
      // Hàm gọi API để tìm kiếm với phân trang
      searchHoiViens(keyword: string, page: number, size: number): Observable<any> {
        let params = new HttpParams()
          .set('keyword', keyword || '')  // Nếu không có keyword, gửi chuỗi rỗng
          .set('page', page.toString())
          .set('size', size.toString());
    
        return this.http.get<any>(this.apiUrl+"/searchPage", { params });
      }
<<<<<<< HEAD
  
=======

>>>>>>> 3854c00292736ee617b3daa90044772ec186972f
}
