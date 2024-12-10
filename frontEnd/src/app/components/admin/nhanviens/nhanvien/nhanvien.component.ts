import { Component } from '@angular/core';
import {Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NhanvienService } from '../../../../services/nhanvien.service';
@Component({
  selector: 'app-nhanvien',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './nhanvien.component.html',
  styleUrl: './nhanvien.component.css'
})
export class NhanvienComponent {
  constructor(private NhanvienService:NhanvienService, private router: Router) {}

  NhaVienList: any[] = [];
  ngOnInit(): void {
    this.getNhanViens(0,this.pageSize);
  }

  goBack(): void {
    this.router.navigate(['/quanlynhanvien']); 
  }

  deleteNhanVien(maNV: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      this.NhanvienService.deleteNhanVien(maNV).subscribe(
        response => {
          this.getNhanViens(0,this.pageSize);
        },
        error => {
          alert("Có lỗi xảy ra khi xóa nhân viên có thể liên kết khóa ngoại")
          console.error('Có lỗi xảy ra khi xóa sách:', error);
        }
      );
    }
  }
  
  editNhanVien(nhanvien: any): void {
    this.NhanvienService.nhanVien =nhanvien; 
    this.router.navigateByUrl("/updateNhanVien"); 
  }
    // Hàm để tách chuỗi trước dấu ","
    getBeforeComma(url: string): string {
      return url.split(',')[0];
    }

    currentPage: number = 0; // Trang hiện tại
  totalPages: number = 0; // Tổng số trang
  pageSize: number = 4; // Kích thước trang
  displayedPages: number[] = [];
  keyword: string = ''; 
    // Phương thức gọi API để lấy lịch sử thanh toán
    getNhanViens(page: number, size: number): void {
      this.NhanvienService.searchNhanViens(this.keyword, page, size).subscribe(
        (data) => {
          this.NhaVienList = data.content; // Dữ liệu của trang hiện tại
          this.currentPage = data.number; // Trang hiện tại
          this.totalPages = data.totalPages; // Tổng số trang
          this.updateDisplayedPages(); // Cập nhật các nút trang
        },
        (error) => {
          console.error('Lỗi khi gọi api:', error);
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
        this.getNhanViens(page, this.pageSize);
      }
    }
    search(): void {
      this.currentPage = 0; // Đặt lại trang về 0 khi tìm kiếm mới
      this.getNhanViens( this.currentPage, this.pageSize); // Gọi lại API với keyword mới
    }
    onSearch(keyword: string) {
      this.keyword=keyword;// Lấy giá trị của ô input khi nhấn nút
      this.getNhanViens(0,this.pageSize);
    }
}
