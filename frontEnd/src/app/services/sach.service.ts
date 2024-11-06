import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sach } from '../models/sach.model';

@Injectable({
  providedIn: 'root'
})
export class SachService {
  private apiUrl = 'http://localhost:8080/rest/sach';

  constructor(private http: HttpClient) {}

  public sach: Sach = { 
    maSach: '', 
    tenSach: '', 
    nxb: '', 
    namXB: 0, 
    tacGia: { 
        maTacGia: '',
        tenTacGia: '',
        ngaySinh: new Date(), 
        quocGia: '',
    }, 
    hinhAnhSach: '', 
    theLoai: { 
        maTheLoai: '',
        tenTheLoai: '',
    },
    moTa: '',
  };

  // Phương thức thêm sách
  addSach(sach: Sach, file: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('sach', JSON.stringify(sach));

    // Chỉ thêm file vào formData nếu nó không phải là null
    if (file) {
      formData.append('file', file);
    }

    return this.http.post(this.apiUrl, formData);
  }

  // Phương thức tìm tất cả sách
  findAll(): Observable<Sach[]> {
    return this.http.get<Sach[]>(this.apiUrl);
  }

  // Phương thức xóa sách theo mã
  deleteSach(maSach: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${maSach}`);
  }
}
