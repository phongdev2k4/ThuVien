import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AsideComponent } from "../../aside/aside.component";

@Component({
  selector: 'app-table-phieutra',
  standalone: true,
  imports: [AsideComponent,CommonModule,FormsModule,RouterLink],
  templateUrl: './table-phieutra.component.html',
  styleUrl: './table-phieutra.component.css'
})
export class TablePhieutraComponent {
  // nhanVienList: any[] = [];
  // hoiVienList: any[] = [];
  // phieuMuonList: any[] = [];
  phieuTraList: any[] = [];

  phieuTra: any = {
    maPT: '',
    phieuMuon:{maPM:''},
    hoiVien: { maHV: '' },
    nhanVien: { maNV: '' },
    ngayLapPhieuTra: '',
    chiTietPhieuTraList: [
      { maSach: '', tenSach: '', ngayTra: '' }
    ]
  };

  onSubmit() {
    // Xử lý lưu thông tin phiếu trả
  }

  deletePhieuTra(maPT: number) {
    // Xử lý xóa phiếu trả
  }
}
