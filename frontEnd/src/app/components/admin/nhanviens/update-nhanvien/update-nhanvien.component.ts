import { Component } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { AsideComponent } from '../../aside/aside.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NhanvienService } from '../../../../services/nhanvien.service';
@Component({
  selector: 'app-update-nhanvien',
  standalone: true,
  imports: [AsideComponent,FormsModule,CommonModule],
  templateUrl: './update-nhanvien.component.html',
  styleUrl: './update-nhanvien.component.css'
})
export class UpdateNhanvienComponent {
  constructor(private router: Router,private nhanvienService:NhanvienService) {}
  nhanVien: any = {
    maNV: "",
    email: "",
    hoTen: "",
    soDienThoai: "",
    gioiTinh: "",
    diaChi: "",
    ngaySinh: "",
    tinhTrang: "",
    hinhAnhNV: "",
    taiKhoanNV: {
        userName: "",
        password: "",
        authorities: [
          {
            chucVu: {
                id: "",
                tenChucVu: ""
            }
          }
        ]
    }
};

ngOnInit(): void {
    this.nhanVien=this.nhanvienService.nhanVien;
}
  selectedFile: File | null = null; // Khởi tạo với giá trị null file 
  selectedFileName: string | null = null; // ten file
  onFileSelected(event: any): void {
  const fileList: FileList = event.target.files; // Lấy danh sách các tệp
  if (fileList.length > 0) {
    this.selectedFile= fileList[fileList.length - 1]; // Lấy tệp cuối cùng
    
  }
}
onSubmit(): void {
  this.nhanvienService.updateNhanVien(this.nhanVien, this.selectedFile ).subscribe(
    response => {
      console.log('Nhân viên đã được cập nhật thành công:', response);
      alert("Nhân viên  đã được cập nhật thành công");
      this.router.navigate(['/quanlynhanvien']); 
    },
    error => {
      console.error('Có lỗi xảy ra khi cập nhật Nhân viên:', error);
      alert("Có lỗi xảy ra khi cập nhật Nhân viên");
    }
  );
} 
goBack(): void {
  this.router.navigate(['/quanlynhanvien']); 
}


}
