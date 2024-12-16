import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { TheloaiService } from '../../../../services/theloai.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-theloai',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink
    ],
    templateUrl: './theloai.component.html',
    styleUrl: './theloai.component.css'
})
export class TheloaiComponent implements OnInit{
  theloaiList: any[] = [];
  constructor(private TheloaiService:TheloaiService, private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Only fetch cover images if we are in the browser (not server-side)
        this. loadTheLoai();

    } else {
      console.log('Not running in the browser, skipping API call');
    }
 }

 loadTheLoai(): void {
  this.TheloaiService.getTheLoai().subscribe(
    data => {
      this.theloaiList= data;
    },
    error => {
      console.error('Có lỗi xảy ra khi gọi API:', error);
    }
  );
}
editTheLoai(theloaif: any): void {
  this.TheloaiService.theLoai =theloaif; 
  this.router.navigateByUrl("/AdminAddTheloai"); 
}

deleteTheLoai(maTheLoai: string): void {
  if (confirm('Bạn có chắc chắn muốn xóa thể loại này?')) {
    this.TheloaiService.deleteTheLoai(maTheLoai).subscribe(
      response => {
        console.log('Thể loại đã được xóa thành công:', response);
        this.loadTheLoai(); // Tải lại danh sách tác giả
      },
      error => {
        console.error('Có lỗi xảy ra khi xóa thể loại:', error);
      }
    );
  }
}
}
