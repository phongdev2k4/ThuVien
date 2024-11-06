import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AsideComponent } from "../../aside/aside.component";

@Component({
  selector: 'app-phieumuon',
  standalone: true,
  imports: [CommonModule, AsideComponent, FormsModule],
  templateUrl: './phieumuon.component.html',
  styleUrls: ['./phieumuon.component.css']
})
export class PhieumuonComponent {

  phieuMuon: any = {
    hoiVien: {
      maHV: ''
    },
    nhanVien: {
      maNV: ''
    },
    ngayLapPhieu: '',
    hanTraSach: '',
    chiTietPhieuMuonList: []
  };

  constructor(private router: Router) {}

  // Thêm ! vào đây để báo cho TypeScript rằng biến này sẽ được gán sau
  @ViewChild('bookList', { static: false }) bookList!: ElementRef<HTMLTableElement>;

  addBookRow() {
    this.phieuMuon.chiTietPhieuMuonList.push({
      maSach: '',
      tenSach: '',
      tacGia: '',
      ngayMuon: ''
    });
  }

  // Xóa sách tại vị trí index trong danh sách
  deleteBook(index: number) {
    this.phieuMuon.chiTietPhieuMuonList.splice(index, 1);
  }

  goBack() {
    this.router.navigate(['/tablePhieuTra']); 
  }

  // Hàm xử lý submit form (nếu cần)
  onSubmit() {
    console.log('Phiếu mượn:', this.phieuMuon);
  }
}
