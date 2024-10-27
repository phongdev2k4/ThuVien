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
  public sach = {
    maSach: '', // Mã sách
    tenSach: '', // Tên sách
    nxb: '', // Nhà xuất bản
    namXB: 0, // Năm xuất bản
    tacGia: {
        maTacGia: '', // Mã tác giả
        tenTacGia: '', // Tên tác giả
        ngaySinh: new Date(), // Ngày sinh
        quocGia: '', // Quốc gia
    },
    hinhAnhSach: '', // Hình ảnh sách
    moTa: '', // Mô tả sách
    theLoais: [
      {
        maTheLoai:''
      }
    ], 
};  

addSach(sach: any, file: File | null): Observable<any> {
  const formData = new FormData();
  formData.append('sach', JSON.stringify(sach));

  // Chỉ thêm file vào formData nếu nó không phải là null
  if (file) {
      formData.append('file', file);
  }
  return this.http.post(this.apiUrl+'/sachdto', formData);
}

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/sachdto');
  }
  deleteSach(maSach: string): Observable<any> {
    return this.http.delete(`${this.apiUrl+'/sachdto'}/${maSach}`);
  }
  resetSach(): void{
    this.sach = {
      maSach: '', // Mã sách
      tenSach: '', // Tên sách
      nxb: '', // Nhà xuất bản
      namXB: 0, // Năm xuất bản
      tacGia: {
          maTacGia: '', // Mã tác giả
          tenTacGia: '', // Tên tác giả
          ngaySinh: new Date(), // Ngày sinh
          quocGia: '', // Quốc gia
      },
      hinhAnhSach: '', // Hình ảnh sách
      moTa: '', // Mô tả sách
      theLoais: [] 
  };
  }
}
