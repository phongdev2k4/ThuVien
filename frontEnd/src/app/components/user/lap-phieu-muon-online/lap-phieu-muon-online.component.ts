


import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BanSaoSach } from '../../../models/bansaosach.model';
import { BansaosachService } from '../../../services/bansaosach.service';

import { FormsModule } from '@angular/forms';
import { PhieuMuonService } from '../../../services/phieu-muon.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';



@Component({
  selector: 'app-lap-phieu-muon-online',

  imports: [AsideComponent,CommonModule,FormsModule],

  templateUrl: './lap-phieu-muon-online.component.html',
  styleUrl: './lap-phieu-muon-online.component.css'
})
export class LapPhieuMuonOnlineComponent {

  cartItems: any[] = [];
  bookList: any[] = [];
  maHoiVien: string = ''; // For Mã Hội Viên
  tenHoiVien: string = '';
  ngayHenLay: string = ''; 
  constructor(public bssService : BansaosachService,public pmService : PhieuMuonService,private cartService: CartService,  private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {
    console.log('Component initialization started');

    if (isPlatformBrowser(this.platformId)) {
      // Only fetch cover images if we are in the browser (not server-side)
      this.loadCartItems();
        this.loadBooks();
        this.populateInputsFromLocalStorage();

    } else {
      console.log('Not running in the browser, skipping API call');
    }

    console.log('ngOnInit completed');
  }
  loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
  }
  loadBooks() {
    const bookIds = this.cartItems.map((item) => item.sach.maSach);
    console.log(bookIds);
    if (bookIds.length > 0) {
      this.bssService.findBySachIds(bookIds).subscribe((data) => {
        this.bookList = Object.values(data);
        console.log(this.bookList) // Convert the result object to an array
      });
    }
  }
  getTTNguoiDung(): any {
    const ttNguoiDung = localStorage.getItem('TTNguoiDung');
    return ttNguoiDung ? JSON.parse(ttNguoiDung) : null;
  }

  populateInputsFromLocalStorage(): void {
    const userData = this.getTTNguoiDung();
    if (userData) {
      this.maHoiVien = userData.maHV || ''; // Map maNV to Mã Hội Viên
      this.tenHoiVien = userData.hoTen || ''; // Map hoTen to Tên Hội Viên
    }
  }
  Post(): void{
    if (!this.maHoiVien || !this.ngayHenLay) {
      alert('Please ensure all required fields are filled.');
      return;
    }

    const dto = {
      maHV: this.maHoiVien,
      ngayHenLay: this.ngayHenLay,
      idBanSaoSach: this.bookList.map((book) => book.maBanSaoSach)
    };
    console.log('Posting DTO:', dto);
    this.pmService.postMuonOnline(dto).subscribe(
      (response) => {
        console.log('Borrow request created successfully:', response);
        alert('Request submitted successfully!');
      },
      (error) => {
        console.error('Error creating borrow request:', error);
        alert('An error occurred while submitting the request.');
      }
    );
    this.clear();
  }

  clear(): void {
    // Clear form fields
    this.maHoiVien = '';
    this.tenHoiVien = '';
    this.ngayHenLay = '';
    this.bookList = [];
    this.cartService.clearCart();
    // Navigate to /trangChu
    this.router.navigate(['/trangChu']);
  }

}
