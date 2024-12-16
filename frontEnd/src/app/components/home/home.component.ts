import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { SachService } from '../../services/sach.service';
import { CartService } from '../../services/cart.service';


import { BansaosachService } from '../../services/bansaosach.service';
import { AsideComponent } from '../aside/aside.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { PhieuMuonService } from '../../services/phieu-muon.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule,AsideComponent,RouterModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
  coverImages: any[] = [];
  isDataLoaded = false;

  constructor(public authService: AuthService,private bssService:BansaosachService,private sachService:SachService,private zone: NgZone,@Inject(PLATFORM_ID) private platformId: Object ,private cartService: CartService, private localStorageService: LocalStorageService,private pmService: PhieuMuonService) {}

  ngOnInit(): void {
    console.log('Component initialization started');

    if (isPlatformBrowser(this.platformId)) {
      // Only fetch cover images if we are in the browser (not server-side)
        this.fetchCoverImages();

    } else {
      console.log('Not running in the browser, skipping API call');
    }

    console.log('ngOnInit completed');
  }

  fetchCoverImages(): void {
    this.coverImages = [];
    this.bssService.fetchHomeItems().subscribe({
      next: (images: any[]) => {
        for (const image of images) {
          if (image.soLuong > 0) { // Check if soLuong > 0
            this.coverImages.push(image);
          }
        }
        console.log('Filtered cover images:', this.coverImages);
      },
      error: (err) => {
        console.error('Error fetching cover images:', err);
      },
    });
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
