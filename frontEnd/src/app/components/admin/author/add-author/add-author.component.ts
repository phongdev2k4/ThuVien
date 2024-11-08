 import { Component } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { Router,RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TacgiaService } from '../../../../services/tacgia.service';

@Component({
  selector: 'app-add-author',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    AsideComponent
  ],
  templateUrl: './add-author.component.html',
  styleUrl: './add-author.component.css'
})
export class AddAuthorComponent {


  constructor(public tacgiaService: TacgiaService, private router: Router) {}

  addTacGia(): void {
    if (this.isFormValid()) {
      this.tacgiaService.addTacGia(this.tacgiaService.tacGia).subscribe(
        response => {
          console.log('Tác giả đã được thêm thành công:', response);
          alert("Tác giả đã được thêm thành công");
          this.router.navigateByUrl("/AuthorsAdmin"); // Điều hướng về danh sách tác giả
        },
        error => {
          console.error('Có lỗi xảy ra khi thêm tác giả:', error);
          alert("Có lỗi xảy ra khi thêm tác giả");
        }
      );
    } else {
      console.error('Form không hợp lệ, không thể thêm tác giả.');
      alert("Không được trống các trường dữ liệu");
    }
  }
  
  UpdateTacGia(): void {
    if (this.isFormValid()) {
      this.tacgiaService.addTacGia(this.tacgiaService.tacGia).subscribe(
        response => {
          console.log('Tác giả đã được cập nhật thành công:', response);
          alert("Tác giả đã được cập nhật thành công");
          this.router.navigateByUrl("/AuthorsAdmin"); // Điều hướng về danh sách tác giả
        },
        error => {
          console.error('Có lỗi xảy ra khi cập nhật tác giả:', error);
          alert("Có lỗi xảy ra khi cập nhật tác giả");
        }
      );
    }else{
      console.error('Form không hợp lệ, không thể cập nhật tác giả.');
      alert("Không được trống các trường dữ liệu");
    }

  }

  
  goBack(): void {
    this.router.navigate(['/AuthorsAdmin']); // Điều hướng về AuthorsAdmin
  }

  isFormValid(): boolean {
    return !!this.tacgiaService.tacGia.maTacGia && // Kiểm tra maTacGia không rỗng
           !!this.tacgiaService.tacGia.tenTacGia && // Kiểm tra tenTacGia không rỗng
           this.tacgiaService.tacGia.ngaySinh !== null && // Kiểm tra ngaySinh không phải null
           this.tacgiaService.tacGia.ngaySinh !== undefined && // Kiểm tra ngaySinh không phải undefined
           !!this.tacgiaService.tacGia.quocGia; // Kiểm tra quocGia không rỗng
  }
  
}
