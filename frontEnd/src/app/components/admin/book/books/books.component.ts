import { Component } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SachService } from '../../../../services/sach.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    AsideComponent,
    RouterLink
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  constructor(private sachService:SachService, private router: Router) {}
  sachList: any[] = [];
  ngOnInit(): void {
    this.loadSach();
    this.sachService.resetSach();
  }
  loadSach(): void {
    this.sachService.findAll().subscribe(
      (data: any[]) => {
        this.sachList = data;
      },
      error => {
        console.error('Có lỗi xảy ra khi tải dữ liệu sách:', error);
      }
    );
  }
  editSach(sach: any): void {
    this.sachService.sach =sach; 
    this.router.navigateByUrl("/addBookadmin"); 
  }
  deleteSach(maSach: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa sách này?')) {
      this.sachService.deleteSach(maSach).subscribe(
        response => {
          console.log('Sách đã được xóa thành công:', response);
          this.loadSach(); 
        },
        error => {
          alert("Có lỗi xảy ra khi xóa sách có thể liên kết khóa ngoại")
          console.error('Có lỗi xảy ra khi xóa sách:', error);
        }
      );
    }
  }

}
