
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BanSaoSach } from '../models/bansaosach.model';

@Injectable({
  providedIn: 'root'
})
export class BansaosachService {
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080/rest/bansaosach';
  public bansaosach: BanSaoSach={
        maBanSaoSach: 1,
        sach: {
            maSach: "",
            tenSach: "",
            nxb: "",
            namXB: 0,
            tacGia: {
             maTacGia: "",
             tenTacGia: "",
             ngaySinh: new Date(),
             quocGia: ""
                },
                moTa: ""
            },
            kho: {
                maKho: 0,
                tenKho: "",
                diaDiem: ""
            },
            trangThaiMuon: "",
            trangThaiBaoQuan: "",
            soLuong123 : 0
    
  }
  public soLuong = 1; 
  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  addBanSaoSach(bansaosach: any, soLuong: any): Observable<any> {  
    const payload = {
      bansaosach: bansaosach,
      soLuong: soLuong,
    };
    return this.http.post<any>(this.apiUrl,payload);
  }
  deleteBanSaoSach(mabansaosach: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${mabansaosach}`);
  }

  updateBanSaoSach(bansaosach: any): Observable<any> {  
    return this.http.post<any>(this.apiUrl+'/update',bansaosach);
  }
  findByMaVach(maVach: string): Observable<BanSaoSach> {
      return this.http.get<BanSaoSach>(`${this.apiUrl+'/mavach'}/${maVach}`);
    }
    fetchHomeItems(): Observable<any> {
      return this.http.get<BanSaoSach>(`${this.apiUrl+'/with-cover-images'}`);
    }

   
    findBySachIds(sachIds: string[]): Observable<any> {
      let params = new HttpParams();
      sachIds.forEach((id) => {
        params = params.append('sachIds', id);
      });
    
      return this.http.get<any>(`${this.apiUrl}/findBySachIds`, { params });
    }

}
