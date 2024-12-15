import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { SachService } from '../../services/sach.service';
import { CartService } from '../../services/cart.service';


import { BansaosachService } from '../../services/bansaosach.service';
import { AsideComponent } from '../aside/aside.component';

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

  constructor(public authService: AuthService,private bssService:BansaosachService,private sachService:SachService,private zone: NgZone,@Inject(PLATFORM_ID) private platformId: Object ,private cartService: CartService ) {}

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
  // fetchCoverImages(): void {
  //   this.sachService.getCoverImages().subscribe({
  //     next: (images) => {
  //       this.coverImages = images;
  //       this.isDataLoaded = true; // Mark as loaded
  //       console.log('Cover images fetched successfully:', this.coverImages);
  //     },
  //     error: (err) => {
  //       console.error('Error fetching cover images:', err);
  //     },
  //   });
  // }
  fetchCoverImages(): void {
    this.bssService.fetchHomeItems().subscribe({
      next: (images) => {
        this.coverImages = images;
        this.isDataLoaded = true; // Mark as loaded
        console.log('Cover images fetched successfully:', this.coverImages);
      },
      error: (err) => {
        console.error('Error fetching cover images:', err);
      },
    });
  }
  addToCart(book: any,event: Event): void {
    event.stopPropagation(); 
    console.log('Cart Items:', this.cartService.getCartItems());
    console.log('Book to Add:', book);

    const isBookInCart = this.cartService.getCartItems().some(
      (cartItem: any) => cartItem.sach.maSach === book.sach.maSach
    );
    console.log('Is Book In Cart:', isBookInCart);
    
    
  
    if (isBookInCart) {
      // Show alert if the book is already in the cart
      alert('You cannot add the same book to the cart.');
    } else {
      // Add the book to the cart if not a duplicate
      this.cartService.addToCart(book);
      alert(`${book.sach.tenSach} has been added to the cart.`);
    }
   
  }
}
