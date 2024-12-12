import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SachService } from '../../services/sach.service';
import { AsideComponent } from "../admin/aside/aside.component";

@Component({
  selector: 'app-chitietsanpham',
  standalone: true,
  imports: [AsideComponent,CommonModule,RouterLink],
  templateUrl: './chitietsanpham.component.html',
  styleUrl: './chitietsanpham.component.css'
})
export class ChitietsanphamComponent {
  coverImages: any[] = [];
  maSach : any;
  bookDetail : any = null; // để chứa thông tin chi tiết
  Images: any [] = [];
  mainImage: string = ''; // Ảnh chính
  sach :  any;

  constructor(private sachService : SachService ,  private route: ActivatedRoute){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.maSach= params.get('maSach');
      this.sachService.sach2.forEach(book=>{
        if(this.maSach==book.sach.maSach){
          this.sach=book;
          return;
        }
      })
    });

     this.fetchImagesByMaSach(this.maSach);
     this.fetchCoverImages();

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

  fetchCoverImages(): void {
    this.sachService.getCoverImages().subscribe({
      next: (images) => {
        this.coverImages = images;
        this.sachService.sach2=images;
        console.log('Cover images fetched successfully:', this.coverImages);
      },
      error: (err) => {
        console.error('Error fetching cover images:', err);
      },
    });
  }
}
