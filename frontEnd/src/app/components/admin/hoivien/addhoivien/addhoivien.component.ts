import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SweetAlertServiceService } from '../../../../services/sweet-alert-service.service';
import { Router,RouterLink } from '@angular/router';
import { HoivienService } from '../../../../services/hoivien.service';

@Component({
  selector: 'app-addhoivien',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './addhoivien.component.html',
  styleUrl: './addhoivien.component.css'
})
export class AddhoivienComponent {
  constructor(private router: Router,private hoivienService:HoivienService,private sweetAlertService: SweetAlertServiceService) {}
  hoiVien: any = {
    maHV: "",
    email: "",
    soDienThoai: "",
    hoTen: "",
    diaChi: "",
    thoiGianDangKy: new Date(),
    tinhTrang: true,
    hinhAnhHV: "",
    tienNap:0,
    taiKhoanHV: {
        userName: "",
        password: "",
        authorities: []
    }
};
  selectedFile: File | null = null; // Khởi tạo với giá trị null file 
  selectedFileName: string | null = null; // ten file
  onFileSelected(event: any): void {
  const fileList: FileList = event.target.files; // Lấy danh sách các tệp
  if (fileList.length > 0) {
    this.selectedFile= fileList[fileList.length - 1]; // Lấy tệp cuối cùng
    
  }
}
onSubmit(): void {
  this.sweetAlertService.loading('Đang thêm hội viên...');
  this.hoivienService.addHoiVien(this.hoiVien, this.selectedFile).subscribe(
    response => {
      this.sweetAlertService.closeLoading();
      this.sweetAlertService.success("Thêm Thành Công")
      this.router.navigate(['/hoivienlist']);
    },
    error => {
      this.sweetAlertService.closeLoading();
      // Kiểm tra lỗi có phải là lỗi 400 không
      if (error.status === 400) {
        let errorMessage = error.error.message || error.error; // Lấy thông báo lỗi nếu có trong body JSON

        // Kiểm tra lỗi về tên đăng nhập 
        if (errorMessage === "Tên đăng nhập đã tồn tại!") {
          this.sweetAlertService.warning(errorMessage);
        } else {
          this.sweetAlertService.error("Lỗi");
        }
      } else {
        this.sweetAlertService.error("Lỗi");
      }
      
    }
  );
}
goBack(): void {
  this.router.navigate(['/hoivienlist']); 
}
}
