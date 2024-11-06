import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AsideComponent } from "../../aside/aside.component";

@Component({
  selector: 'app-thongtinphieutra',
  standalone: true,
  imports: [AsideComponent,CommonModule,FormsModule],
  templateUrl: './thongtinphieutra.component.html',
  styleUrl: './thongtinphieutra.component.css'
})
export class ThongtinphieutraComponent {

  constructor (private router:Router) {}

  thongtinphieutra: any [] = [];

  thongtinphieutraList: any = {
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
    phieuMuon : 
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
  }
  
  goback() {
    this.router.navigate(['/tablePhieuTra']);
  }


}
