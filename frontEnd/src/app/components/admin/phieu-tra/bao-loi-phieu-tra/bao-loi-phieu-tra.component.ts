import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-bao-loi-phieu-tra',
    imports: [CommonModule, FormsModule],
    standalone: true,
    templateUrl: './bao-loi-phieu-tra.component.html',
    styleUrl: './bao-loi-phieu-tra.component.css'
})
export class BaoLoiPhieuTraComponent {
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
