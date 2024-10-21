import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AsideComponent } from "../../aside/aside.component";

@Component({
  selector: 'app-nhanvien',
  standalone: true,
  imports: [AsideComponent,FormsModule,CommonModule],
  templateUrl: './nhanvien.component.html',
  styleUrl: './nhanvien.component.css'
})
export class NhanvienComponent {

  nhanVien: any = {
    maNV: '',           // Mã Nhân Viên
    hoTen: '',          // Họ Tên
    matKhau: '',        // Mật Khẩu
    soDienThoai: '',    // Số Điện Thoại
    email: '',          // Email
    diaChi: '',         // Địa Chỉ
    ngaySinh: '',       // Ngày Sinh (dạng Date hoặc chuỗi)
    gioiTinh: '',       // Giới Tính
    tinhTrang: '',      // Tình Trạng
    chucVu: {           // Chức Vụ (đối tượng lồng nhau)
      tenCV: ''         // Tên Chức Vụ
    },
    hinhAnhNV: ''       // Đường dẫn Hình Ảnh Nhân Viên
  };
  
  chucVuList: any [] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getChucVuList(); // Lấy danh sách chức vụ khi khởi tạo component
  }

  
  getChucVuList(): void {
   
  }

  // Hàm khi chọn file hình ảnh
  onFileSelected(event: any): void {
    
  }

  // Hàm submit form
  onSubmit(): void {
    const formData = new FormData();
    // // Đưa các thông tin vào FormData để gửi lên backend
    // formData.append('maNV', this.nhanVien.maNV);
    // formData.append('email', this.nhanVien.email);
    // formData.append('matKhau', this.nhanVien.matKhau);
    // formData.append('hoTen', this.nhanVien.hoTen);
    // formData.append('soDienThoai', this.nhanVien.soDienThoai);
    // formData.append('gioiTinh', this.nhanVien.gioiTinh);
    // formData.append('diaChi', this.nhanVien.diaChi);
    // formData.append('ngaySinh', this.nhanVien.ngaySinh ? this.nhanVien.ngaySinh.toString() : '');
    // formData.append('tinhTrang', this.nhanVien.tinhTrang);
    // formData.append('chucVu', this.nhanVien.chucVu ? this.nhanVien.chucVu.maCV : '');

    // if (this.selectedFile) {
    //   formData.append('hinhAnhNV', this.selectedFile, this.selectedFile.name);
    }

    // Gọi service để lưu nhân viên
    // this.nhanVienService.createNhanVien(formData).subscribe(response => {
    //   console.log('Nhân viên đã được lưu:', response);
    //   this.router.navigate(['/nhan-vien-list']); // Chuyển hướng đến trang danh sách nhân viên
    // }, error => {
    //   console.error('Error creating Nhan Vien:', error);
    // });
    goBack() {
      this.router.navigate(['/tableNhanVien']); 
    }
  }


