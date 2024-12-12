import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { SachService } from '../../services/sach.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 
  coverImages: any[] = [];
 
  isDataLoaded = false;
 
  constructor(public authService: AuthService,private sachService:SachService,private zone: NgZone,@Inject(PLATFORM_ID) private platformId: Object  ) {}
  
  ngOnInit(): void {
    console.log('Component initialization started');

    if (isPlatformBrowser(this.platformId)) {
      // Chỉ lấy ảnh bìa nếu chúng ta đang ở trong trình duyệt (không phải phía máy chủ)
        this.fetchCoverImages();
    } else {
      console.log('Not running in the browser, skipping API call');
    }
    console.log('ngOnInit completed');
  }
  
  fetchCoverImages(): void {
    this.sachService.getCoverImages().subscribe({
      next: (images) => {
        this.coverImages = images;
        this.sachService.sach2=images;
        this.isDataLoaded = true; // Mark as loaded
        console.log('Cover images fetched successfully:', this.coverImages);
      },
      error: (err) => {
        console.error('Error fetching cover images:', err);
      },
    });
  }
}
