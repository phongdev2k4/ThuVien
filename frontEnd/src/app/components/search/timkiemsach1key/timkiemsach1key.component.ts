import { CommonModule ,isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { SachService } from '../../../services/sach.service';
import { ActivatedRoute, Router,RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { BansaosachService } from '../../../services/bansaosach.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { PhieuMuonService } from '../../../services/phieu-muon.service';

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
  constructor( private localStorageService: LocalStorageService,private pmService: PhieuMuonService,private bssService:BansaosachService,private sachService:SachService, private router: Router,private route: ActivatedRoute,@Inject(PLATFORM_ID) private platformId: Object ,private cartService: CartService ) {}
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

     addToCart(book: any, event: Event): void {
      event.stopPropagation(); 
    
      // Get the roles from local storage to ensure the user is eligible to borrow books
      const roles = this.localStorageService.getRoles();
      if (roles.includes("ADMIN") || roles.includes("EMPLOYEE")) {
        alert("Chỉ user mới có thể đặt sách online ");
        return; // Exit the method if user is not a regular user
      }
    
      console.log('Cart Items:', this.cartService.getCartItems());
      const cartItems = this.cartService.getCartItems();
      console.log('Book to Add:', book);
    
      // Check if there are already 2 or more books in the cart
      if (cartItems.length >= 2) {
        alert("Không thể mượn quá 2 quyển ");
        return; // Exit the method if more than 2 books are in the cart
      }
    
      // Get the current user's maHV (ID) from local storage
      const maHV = this.localStorageService.getTTNguoiDung();
      console.log(maHV.maHV);
    
      // Call the service to check how many books the user has borrowed today
      this.pmService.getCountBorrowedToday(maHV.maHV).subscribe(
        (count: number) => {
          console.log('Books borrowed today:', count);
    
          // Check if the user has already borrowed 2 or more books today
          if (count >= 1) {
            alert("Đã quá lần mượn quyển trong ngày xin hãy mượn vào những ngày sau");
            return; // Exit the method if the user has borrowed 2 or more books today
          }
    
          // Now proceed to check if the book is already in the cart
          const isBookInCart = this.cartService.getCartItems().some(
            (cartItem: any) => cartItem.sach.maSach === book.sach.maSach
          );
          console.log('Is Book In Cart:', isBookInCart);
    
          if (isBookInCart) {
            // Show alert if the book is already in the cart
            alert('You cannot add the same book to the cart.');
          } else {
            // Add the book to the cart if it's not already there
            this.cartService.addToCart(book);
            alert(`${book.sach.tenSach} has been added to the cart.`);
          }
        },
        (error) => {
          console.error('Error checking borrowed books count:', error);
          alert('There was an error checking the number of borrowed books.');
        }
      );
    }
    
}