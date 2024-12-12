import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { HoiVienService } from '../../../services/hoivien.service';

import { AsideComponent } from '../../admin/aside/aside.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    AsideComponent
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  
  constructor(public hoiVienService: HoiVienService, private router: Router) {}
  addhoivien(): void {
    if (this.isFormValid()) {
      this.hoiVienService.addHoiVien(this.hoiVienService.hoiVien).subscribe(
        response => {
          console.log('Thông Tin đã được thêm thành công:', response);
          alert("Thong Tin đã được thêm thành công");
          this.router.navigateByUrl("/Profile"); 
        },
        error => {
          console.error('Có lỗi xảy ra ', error);
          alert("Có lỗi xảy ra ");
        }
      );
    } else {
      console.error('Form không hợp lệ, không thể thêm ');
      alert("Không được trống các trường dữ liệu");
    }
  }
  
  UpdateHoiVien(): void {
    if (this.isFormValid()) {
      this.hoiVienService.addHoiVien(this.hoiVienService.hoiVien).subscribe(
        response => {
          console.log('Tác giả đã được cập nhật thành công:', response);
          alert("Tác giả đã được cập nhật thành công");
          this.router.navigateByUrl("/Profile"); // Điều hướng về danh sách tác giả
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

  backForm(): void {
    this.router.navigate(['/UserListadmin']); // Điều hướng về AuthorsAdmin
  }

  isFormValid(): boolean {
    return !!this.hoiVienService.hoiVien.maHV && // Kiểm tra maHoivien không rỗng
           !!this.hoiVienService.hoiVien.hoTen && 
           !!this.hoiVienService.hoiVien.email && 
           !!this.hoiVienService.hoiVien.soDienThoai && 
           !!this.hoiVienService.hoiVien.matKhau && 
           !!this.hoiVienService.hoiVien.tinhTrang &&
           !!this.hoiVienService.hoiVien.diaChi && 
           !!this.hoiVienService.hoiVien.tienNap
  }

}