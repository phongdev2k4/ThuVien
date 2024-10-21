import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AsideComponent } from "../../aside/aside.component";

@Component({
  selector: 'app-phieutra',
  standalone: true,
  imports: [AsideComponent,CommonModule,FormsModule],
  templateUrl: './phieutra.component.html',
  styleUrl: './phieutra.component.css'
})
export class PhieutraComponent {

  phieuTra: any = {
    maPT: '',
    hoiVien: { maHV: '' },
    nhanVien: { maNV: '' },
    ngayLapPhieuTra: '',
    chiTietPhieuTraList: [
      // Khởi tạo một chi tiết sách trả mẫu
      { maSach: '', tenSach: '', ngayTra: '' }
    ]
  };

  constructor(private router : Router){}

  addPhieuTra() {
  // Tạo đối tượng chi tiết sách mới
  const newChiTiet = {
    maSach: '',   // Mã sách sẽ được nhập vào sau
    tenSach: '',  // Tên sách sẽ được nhập vào sau
    ngayTra: ''   // Ngày trả sẽ được nhập vào sau
  };

  // Thêm đối tượng chi tiết sách mới vào danh sách chi tiết phiếu trả
  this.phieuTra.chiTietPhieuTraList.push(newChiTiet);
}


  onSubmit(){
    
  }

  deleteChiTiet(index: number){
    if (index > -1) {
      this.phieuTra.chiTietPhieuTraList.splice(index, 1);
    }
  }

  goBack() {
    this.router.navigate(['/tablePhieuTra']); 
  }
}
