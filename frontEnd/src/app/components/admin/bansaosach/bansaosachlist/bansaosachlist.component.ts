import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BansaosachService } from '../../../../services/bansaosach.service';
import { Router,RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-bansaosachlist',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink
    ],
    templateUrl: './bansaosachlist.component.html',
    styleUrl: './bansaosachlist.component.css'
})
export class BansaosachlistComponent implements OnInit{
  constructor(private bansaosachService:BansaosachService, private router: Router,@Inject(PLATFORM_ID) private platformId: Object ) {}
  bansaosachList: any[] = [];
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Only fetch cover images if we are in the browser (not server-side)
      this.loadBanSaoSach();

    } else {
      console.log('Not running in the browser, skipping API call');
    }
  }
  loadBanSaoSach(): void {
    this.bansaosachService.findAll().subscribe(
      data => {
        this.bansaosachList = data;
      },
      error => {
        console.error('Có lỗi xảy ra khi gọi API:', error);
      }
    );
  }
  editBanSaoSach(bansaosachf : any): void {
    this.bansaosachService.bansaosach=bansaosachf;
    this.router.navigateByUrl("/updatebansaosach"); 
  }
  deleteBanSaoSach(mabansaosach: number): void {
    if (confirm('Bạn có chắc chắn muốn bản sao sách này?')) {
      this.bansaosachService.deleteBanSaoSach(mabansaosach).subscribe(
        response => {
          console.log('Bản sao sách đã được xóa thành công:', response);
          this.loadBanSaoSach();
        },
        error => {
          console.error('Có lỗi xảy ra khi xóa bản sao sách:', error);
          alert('Có lỗi xảy ra khi xóa bản sao sách')
        }
      );
    }
  }
        // Hàm để tách chuỗi trước dấu ","
        getImage(url: string): string {
          return url.split(',')[0];
        }
}
