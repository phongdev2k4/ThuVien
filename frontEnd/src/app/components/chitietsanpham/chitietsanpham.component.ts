import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SachService } from '../../services/sach.service';
import { AsideComponent } from "../admin/aside/aside.component";

@Component({
  selector: 'app-chitietsanpham',
  standalone: true,
  imports: [AsideComponent,CommonModule],
  templateUrl: './chitietsanpham.component.html',
  styleUrl: './chitietsanpham.component.css'
})
export class ChitietsanphamComponent {

  maSach : string | null = null;
  bookDetail : any = null; // để chứa thông tin chi tiết
  Images: any [] = [];
  mainImage: string = ''; // Ảnh chính

  constructor(private sachService : SachService){}

  ngOnInit() {
    if (this.maSach) {
      this.fetchImagesByMaSach(this.maSach); // Sử dụng this.maSach
    } else {
      console.warn('Mã sách không được cung cấp.');
    }
  }
  

  fetchImagesByMaSach(maSach: string): void {
    this.sachService.getImagesByMaSach(maSach).subscribe({
      next: (images) => {
        this.Images = images; // Gắn danh sách ảnh vào biến coverImages
        console.log('Images for book fetched successfully:', this.Images);
      },
      error: (err) => {
        console.error('Error fetching images for book:', err);
      },
    });
  }
  
  setMainImage(imageUrl: string): void {
    this.mainImage = imageUrl; // Thay đổi ảnh chính
  }

}
