import { Component } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { TacgiaService } from '../tacgia.service';
import { Router,RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
      this.tacgiaService.addTacGia(this.tacgiaService.TacGia).subscribe(
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
      this.tacgiaService.addTacGia(this.tacgiaService.TacGia).subscribe(
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
    return this.tacgiaService.TacGia.maTacGia &&
           this.tacgiaService.TacGia.tenTacGia &&
           this.tacgiaService.TacGia.ngaySinh &&
           this.tacgiaService.TacGia.quocGia;
  }
}
