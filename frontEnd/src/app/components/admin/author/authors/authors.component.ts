import { Component, OnInit } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TacgiaService } from '../tacgia.service';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [
    CommonModule,
    AsideComponent,
    RouterLink
  ],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent implements OnInit{
  tacgiaList: any[] = [];

  constructor(private tacgiaService: TacgiaService, private router: Router) {}

  ngOnInit(): void {
    this.loadTacGia();
  }
 
  loadTacGia(): void {
    this.tacgiaService.getTacGia().subscribe(
      data => {
        this.tacgiaList = data;
      },
      error => {
        console.error('Có lỗi xảy ra khi gọi API:', error);
      }
    );
  }

  editTacGia(tacgia: any): void {
    // debugger;
    this.tacgiaService.TacGia =tacgia; // Sao chép dữ liệu của tác giả vào newTacGia
    this.router.navigateByUrl("/AddAuthorsAdmin"); // Điều hướng về danh sách tác giả
  }
  deleteTacGia(maTacGia: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa tác giả này?')) {
      this.tacgiaService.deleteTacGia(maTacGia).subscribe(
        response => {
          console.log('Tác giả đã được xóa thành công:', response);
          this.loadTacGia(); // Tải lại danh sách tác giả
        },
        error => {
          console.error('Có lỗi xảy ra khi xóa tác giả:', error);
        }
      );
    }
  }
}
