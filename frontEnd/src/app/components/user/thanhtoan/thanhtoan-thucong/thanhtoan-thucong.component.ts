import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { HoivienService } from '../../../../services/hoivien.service';
import { SweetAlertServiceService } from '../../../../services/sweet-alert-service.service';
import { AuthService } from '../../../../services/auth-service.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { ThanhtoanService } from '../../../../services/thanhtoan.service';
@Component({
  selector: 'app-thanhtoan-thucong',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './thanhtoan-thucong.component.html',
  styleUrl: './thanhtoan-thucong.component.css'
})
export class ThanhtoanThucongComponent {
  constructor(private router: Router,private hoivienService:HoivienService,private sweetAlertService: SweetAlertServiceService,private auth:AuthService,private localStorageService:LocalStorageService,private thanhtoanService:ThanhtoanService) {}
  thanhToan:any = {
    trangThaiThanhToan: '',
    loaiThanhToan: '',
    soTien: 0,
    thoiGianThanhToan: new Date(),
    hinhThucThanhToan: '',
    congThanhToan: '',
    trangThaiGiaoDich: '',
    ghiChu: '',
    URlThanhToan: '',
    hoiVien: {
      maHV: ''
    },
    nhanVien: {
      maNV: ''
    }
  };
  ngOnInit(): void {
    this.auth.TimThongTinNguoiDung();
    this.thanhToan.hoiVien=this.hoivienService.hoiVien;
    this.thanhToan.nhanVien=this.localStorageService.getTTNguoiDung();
    }
    onSubmit(): void {
      this.thanhtoanService.ThanhToanThuCong(this.thanhToan).subscribe(
        response => {
          this.sweetAlertService.success("Thanh toán Thành Công")
        },
        error => {
          console.error('Có lỗi xảy ra khi thanh toán:', error);
          this.sweetAlertService.error("Lỗi");
          if (error.status === 400) {
            let errorMessage = error.error.message || error.error; // Lấy thông báo lỗi nếu có trong body JSON
    
            // Kiểm tra lỗi về tên đăng nhập hay email
            if (errorMessage === "Số dư không đủ") {
              this.sweetAlertService.warning(errorMessage);
            } else {
              this.sweetAlertService.error("Lỗi");
            }
          } else {
            this.sweetAlertService.error("Lỗi");
          }
        }
      );
    }
    goBack(): void {
      this.router.navigate(['/']); 
    }
}
