import { Component, OnInit } from '@angular/core';
import { BansaosachService } from '../../../../services/bansaosach.service';
import { Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  constructor(private bansaosachService:BansaosachService, private router: Router) {}
  bansaosachList: any[] = [];
  ngOnInit(): void {
    this.loadBanSaoSach();
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
}
