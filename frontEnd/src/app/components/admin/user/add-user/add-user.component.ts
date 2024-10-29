import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { AsideComponent } from '../../aside/aside.component';
import { HoiVienService } from '../../../../services/hoivien.service'; 
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
  addHoiVien(): void {
    if (this.isFormValid()) {
      this.hoiVienService.addHoiVien(this.hoiVienService.hoiVien).subscribe(
        response => {
          console.log('Thông tin đã được thêm thành công:', response);
          alert("Thông tin đã được thêm thành công");
          this.router.navigateByUrl("/UserListadmin"); 
        },
        error => {
          console.error('Có lỗi xảy ra ', error);
          alert("Có lỗi xảy ra ");
        }
      );
    } else {
      console.error('Form không hợp lệ, không thể thêm ');
      alert("Không được để trống các trường dữ liệu");
    }
  }
  
  UpdateHoiVien(): void {
    if (this.isFormValid()) {
      this.hoiVienService.addHoiVien(this.hoiVienService.hoiVien).subscribe(
        response => {
          console.log('đã được cập nhật thành công:', response);
          alert("đã được cập nhật thành công");
          this.router.navigateByUrl("/UserListComponent"); // Điều hướng về danh sách 
        },
        error => {
          console.error('Có lỗi xảy ra khi cập nhật :', error);
          alert("Có lỗi xảy ra khi cập nhật ");
        }
      );
    }else{
      console.error('Form không hợp lệ, không thể cập nhật .');
      alert("Không được trống các trường dữ liệu");
    }

  }

  
  goBack(): void {
    this.router.navigate(['/']); // Điều hướng về AuthorsAdmin
  }
  isFormValid(): boolean {
    return !!this.hoiVienService.hoiVien.maHV && // Kiểm tra ma không rỗng
          !!this.hoiVienService.hoiVien.taiKhoanHV && 
           !!this.hoiVienService.hoiVien.hoTen && 
           !!this.hoiVienService.hoiVien.email && 
           !!this.hoiVienService.hoiVien.soDienThoai && 
           !!this.hoiVienService.hoiVien.matKhau && 
           !!this.hoiVienService.hoiVien.diaChi && 
           !!this.hoiVienService.hoiVien.tienNap&&
           !!this.hoiVienService.hoiVien.thoiGianDangky

  }
}
