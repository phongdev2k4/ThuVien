import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  Router,RouterLink } from '@angular/router';
import { HoivienService } from '../../../../services/hoivien.service';

@Component({
  selector: 'app-hoivien-list',
  standalone: true,
  imports: [    CommonModule,
    RouterLink],
  templateUrl: './hoivien-list.component.html',
  styleUrl: './hoivien-list.component.css'
})
export class HoivienListComponent {
  constructor(public hoivienService:HoivienService, private router: Router) {}
  HoiVienList: any[] = [];
  ngOnInit(): void {
    this.getHoiViens(0,this.pageSize);
  }
  loadListHoiVien(): void {
    this.hoivienService.getHoiVien().subscribe(
      data => {
        this.HoiVienList = data;
      },
      error => {
        console.error('Có lỗi xảy ra khi gọi API:', error);
      }
    );
  }
      // Hàm để tách chuỗi trước dấu ","
      getImage(url: string): string {
        return url.split(',')[0];
      }

      deleteHoiVien(mahv: string): void {
        if (confirm('Bạn có chắc chắn muốn xóa hội viên này?')) {
          this.hoivienService.deleteHoiVien(mahv).subscribe(
            response => {
              this.loadListHoiVien();
            },
            error => {
              alert("Có lỗi xảy ra khi xóa hội viên có thể liên kết khóa ngoại")
            }
          );
        }
      }
      editHoiVien(hoivien: any): void {
        this.hoivienService.hoiVien =hoivien; 
        this.router.navigate(['/tuychonHoiVien']); 
      }

  currentPage: number = 0; // Trang hiện tại
  totalPages: number = 0; // Tổng số trang
  pageSize: number = 4; // Kích thước trang
  displayedPages: number[] = [];
  keyword: string = ''; 
    // Phương thức gọi API để lấy lịch sử thanh toán
    getHoiViens(page: number, size: number): void {
      this.hoivienService.searchHoiViens(this.keyword, page, size).subscribe(
        (data) => {
          this.HoiVienList = data.content; // Dữ liệu của trang hiện tại
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
        this.getHoiViens(page, this.pageSize);
      }
    }
    search(): void {
      this.currentPage = 0; // Đặt lại trang về 0 khi tìm kiếm mới
      this.getHoiViens( this.currentPage, this.pageSize); // Gọi lại API với keyword mới
    }
    onSearch(keyword: string) {
      this.keyword=keyword;// Lấy giá trị của ô input khi nhấn nút
      this.getHoiViens(0,this.pageSize);
    }

}
