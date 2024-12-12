import { CommonModule ,isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { SachService } from '../../../services/sach.service';
import { ActivatedRoute, Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-timkiemsach1key',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './timkiemsach1key.component.html',
  styleUrl: './timkiemsach1key.component.css'
})
export class Timkiemsach1keyComponent {
  constructor(private sachService:SachService, private router: Router,private route: ActivatedRoute,@Inject(PLATFORM_ID) private platformId: Object  ) {}
 SachList:any[]=[];
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.route.queryParams.subscribe(params => { 
        this.keyword = params['key']; 
       });
       this.loadSachTimkiem(0,this.pageSize)
    } else {
      console.log('Not running in the browser, skipping API call');
    }
  }

  currentPage: number = 0; // Trang hiện tại
  totalPages: number = 0; // Tổng số trang
  pageSize: number = 4; // Kích thước trang
  displayedPages: number[] = [];
  keyword: string = ''; 
    // Phương thức gọi API để lấy lịch sử thanh toán
    loadSachTimkiem(page: number, size: number): void {
      this.sachService.TimKiemSach1(this.keyword, page, size).subscribe(
        (data) => {
          this.SachList = data.content; // Dữ liệu của trang hiện tại
          this.currentPage = data.number; // Trang hiện tại
          this.totalPages = data.totalPages; // Tổng số trang
          this.updateDisplayedPages(); // Cập nhật các nút trang
          console.log(this.SachList)
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
        this.loadSachTimkiem(page, this.pageSize);
      }
    }
    search(): void {
      this.currentPage = 0; // Đặt lại trang về 0 khi tìm kiếm mới
      this.loadSachTimkiem( this.currentPage, this.pageSize); // Gọi lại API với keyword mới
    }
    onSearch(keyword: string) {
      this.keyword=keyword;// Lấy giá trị của ô input khi nhấn nút
      this.loadSachTimkiem(0,this.pageSize);
    }

    formatTienNap(value: number): string {
      return value.toLocaleString('de-DE');
     }
}
