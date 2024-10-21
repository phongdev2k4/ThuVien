import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AsideComponent } from "../../aside/aside.component";

@Component({
  selector: 'app-phieuphat',
  standalone: true,
  imports: [CommonModule, FormsModule, AsideComponent],
  templateUrl: './phieuphat.component.html',
  styleUrl: './phieuphat.component.css'
})
export class PhieuphatComponent {

  // Object phiếu phạt để lưu dữ liệu
  phieuPhat = {
    hoiVien: { maHV: '' },
    phieuTra: { maPT: '' },
    soNgayQuaHan: 0,
    tienPhat: 0.0,
    nhanVien: { maNV: '' }
  };

  constructor(private router : Router) { }

  // Hàm xử lý khi form được submit
  onSubmit() {
  
  }

  goBack() {
    this.router.navigate(['/tablePhieuPhat'])
  }
}
