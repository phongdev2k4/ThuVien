import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TacgiaService } from '../../../../services/tacgia.service';

@Component({
    selector: 'app-authors',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink
    ],
    templateUrl: './authors.component.html',
    styleUrl: './authors.component.css'
})
export class AuthorsComponent implements OnInit{
  tacgiaList: any[] = [];

  constructor(private tacgiaService: TacgiaService, private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadTacGia();

    } else {
      console.log('Not running in the browser, skipping API call');
    }
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
  

  editTacGia(tacgiaf: any): void {
    this.tacgiaService.tacGia =tacgiaf; // Sao chép dữ liệu của tác giả vào newTacGia
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
