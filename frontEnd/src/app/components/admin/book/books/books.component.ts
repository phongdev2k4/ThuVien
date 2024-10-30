import { Component } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { Router,RouterLink } from '@angular/router';
import { SachService } from '../../../../services/sach.service';
import { CommonModule } from '@angular/common';
import { AddBookRes } from '../../../../models/add-book-res';

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
  sachList: AddBookRes[] = [];

  constructor(private sachService:SachService, private router: Router) {}

  ngOnInit(): void {
    this.loadSach();
  }

  loadSach(): void {
    this.sachService.findAll().subscribe(
      (data: any[]) => {
        this.sachList = data;
        console.log('Danh sách sách:', this.sachList);
      },
      error => {
        console.error('Có lỗi xảy ra khi tải dữ liệu sách:', error);
      }
    );
  }
  editSach(sach: any): void {
    this.sachService.sach =sach; 
    console.log(sach);
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
          console.error('Có lỗi xảy ra khi xóa sách:', error);
        }
      );
    }
  }
}
