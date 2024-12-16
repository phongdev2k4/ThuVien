import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NhanvienService {
  private apiUrl = 'http://localhost:8080/rest/nhavien';
  constructor(private http: HttpClient) { }
  public nhanVien= {
    maNV: "",
    email: "",
    hoTen: "",
    soDienThoai: "",
    gioiTinh: "",
    diaChi: "",
    ngaySinh: "",
    tinhTrang: "",
    hinhAnhNV: "",
    taiKhoanNV: {
        userName: "",
        password: "",
        authorities: [
          {
            chucVu: {
                id: "",
                tenChucVu: ""
            }
          }
        ]
    }
};
  getNhanVien(): Observable<any[]> {  
    return this.http.get<any[]>(this.apiUrl);
  }

  addNhanVien(nhavien: any,  file: File | null): Observable<any> {  
    const formData = new FormData();
    formData.append('nhanvien', JSON.stringify(nhavien));
        // Chỉ thêm file vào formData nếu nó không phải là null
        if (file) {
          formData.append('file', file);
      }
    return this.http.post(this.apiUrl, formData);
  }

  updateNhanVien(nhavien: any,  file: File | null): Observable<any> {  
    const formData = new FormData();
    formData.append('nhanvien', JSON.stringify(nhavien));
        // Chỉ thêm file vào formData nếu nó không phải là null
        if (file) {
          formData.append('file', file);
      }
    return this.http.put(this.apiUrl, formData);
  }
  capnhatNhanVien(userName:string,nhanvien: any, file: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('nhanvien', JSON.stringify(nhanvien));
    formData.append('userName', userName);
    // Chỉ thêm file vào formData nếu nó không phải là null
    if (file) {
        formData.append('file', file);
    }
    return this.http.put(this.apiUrl+'/update', formData);
  }
  deleteNhanVien(manhavien: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${manhavien}`);
  }
    // Hàm gọi API để tìm kiếm với phân trang
    searchNhanViens(keyword: string, page: number, size: number): Observable<any> {
      let params = new HttpParams()
        .set('keyword', keyword || '')  // Nếu không có keyword, gửi chuỗi rỗng
        .set('page', page.toString())
        .set('size', size.toString());
  
      return this.http.get<any>(this.apiUrl+"/search", { params });
    }

    findByUsername(username: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl+'/username'}/${username}`);
    }
}
