import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VnpayServiceService } from '../../../../services/vnpay-service.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { ThanhtoanService } from '../../../../services/thanhtoan.service';
import { AuthService } from '../../../../services/auth-service.service';

@Component({
  selector: 'app-thanhtoan',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './thanhtoan.component.html',
  styleUrl: './thanhtoan.component.css'
})
export class ThanhtoanComponent {
  amount: string = '';  // Số tiền
  paymentUrl: string = ''; // URL thanh toán trả về từ backend
  errorMessage: string = ''; // Lỗi nếu có
  
  constructor(private vnpayService: VnpayServiceService,private auth:AuthService,private localStorageService:LocalStorageService,private thanhToanService: ThanhtoanService) {
  }
  NguoiDung: any ;
  lichSuThanhToan: any[] = []; 
  TienNap:any;
  ngOnInit(): void {
  this.auth.TimThongTinNguoiDung();
  this.formatTienNap(this.localStorageService.getTTNguoiDung().tienNap)
  this.getLichSuThanhToanHV(0,this.pageSize);
  }
  onSubmit(): void {
   
    // Gọi service để tạo URL thanh toán
    this.vnpayService.createPaymentUrl(this.localStorageService.getIdUser(),this.amount).subscribe({
      next: (url: string) => {
        if (url) {
          this.paymentUrl = url; // Nhận URL thanh toán từ backend
          this.errorMessage = ''; // Xóa lỗi nếu có
          // Điều hướng người dùng đến URL thanh toán
          // window.location.href = this.paymentUrl; // Redirect đến URL thanh toán
          window.open(this.paymentUrl, '_blank');
        } else {
          this.errorMessage = 'Không nhận được URL thanh toán từ server';
        }
      },
      error: (err) => {
        console.error(err);
        // Hiển thị lỗi chi tiết cho người dùng
        this.errorMessage = 'Đã xảy ra lỗi khi tạo URL thanh toán. Vui lòng thử lại sau.';
      }
    });
  }
  currentPage: number = 0; // Trang hiện tại
  totalPages: number = 0; // Tổng số trang
  pageSize: number = 5; // Kích thước trang
  displayedPages: number[] = [];
    // Phương thức gọi API để lấy lịch sử thanh toán
    getLichSuThanhToanHV(page: number, size: number): void {
      const maHV = this.localStorageService.getTTNguoiDung().maHV;
      this.thanhToanService.getLichSuThanhToan(this.localStorageService.getTTNguoiDung().maHV, page, size).subscribe(
        (data) => {
          this.lichSuThanhToan = data.content; // Dữ liệu của trang hiện tại
          this.currentPage = data.number; // Trang hiện tại
          this.totalPages = data.totalPages; // Tổng số trang
          this.updateDisplayedPages(); // Cập nhật các nút trang
        },
        (error) => {
          console.error('Lỗi khi lấy lịch sử thanh toán:', error);
        }
      );
    }
      // Cập nhật các nút hiển thị
  updateDisplayedPages(): void {
    const maxDisplay = 3; // Số nút hiển thị ở giữa
    const startPage = Math.max(0, this.currentPage - 1); // Bắt đầu từ trang hiện tại - 1
    const endPage = Math.min(this.totalPages - 1, this.currentPage + 1); // Kết thúc ở trang hiện tại + 1

    this.displayedPages = [];

    // Dịch chuyển để luôn hiển thị đúng số lượng nút
    for (let i = startPage; i <= endPage; i++) {
      this.displayedPages.push(i);
    }

    // Đảm bảo luôn hiển thị đủ `maxDisplay` trang nếu có thể
    while (this.displayedPages.length < maxDisplay) {
      if (this.displayedPages[0] > 0) {
        this.displayedPages.unshift(this.displayedPages[0] - 1);
      } else if (this.displayedPages[this.displayedPages.length - 1] < this.totalPages - 1) {
        this.displayedPages.push(this.displayedPages[this.displayedPages.length - 1] + 1);
      } else {
        break; // Không thể thêm nữa
      }
    }
  }
    // Chuyển trang
    changePage(page: number): void {
      if (page >= 0 && page < this.totalPages) {
        this.getLichSuThanhToanHV(page, this.pageSize);
      }
    }
    formatTienNap(value: number): void {
      this.TienNap=value.toLocaleString('de-DE');
    }
}
