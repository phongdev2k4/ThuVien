import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThongTinPhieuTra } from '../models/thongtinphieutra.model';

@Injectable({
  providedIn: 'root'
})
export class ThongtinphieutraService {

  constructor(private http: HttpClient) { }

  public thongtinphieutra : ThongTinPhieuTra = {
    maPT : '',
    hoiVien : 
      { 
        maHV: '',
        hoTen: '',
        soDienThoai:'',
      },

    nhanVien : '',
    ngayLapPhieuTra : '',
    phieuPhatList : '',
    PhieuMuon : 
      {
        maPM: '',
        ngayLapPhieu: '',
        hanTraSach:'',
      },
    BanSaoSach : 
      {
        Sach : '',
        tinhTrang : '',
      }
  };
}
