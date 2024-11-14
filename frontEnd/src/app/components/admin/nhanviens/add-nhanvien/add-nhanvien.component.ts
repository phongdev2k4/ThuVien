import { Component } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
import { NhanvienService } from '../../../../services/nhanvien.service';

@Component({
  selector: 'app-add-nhanvien',
  standalone: true,
  imports: [AsideComponent,FormsModule,CommonModule],
  templateUrl: './add-nhanvien.component.html',
  styleUrl: './add-nhanvien.component.css'
})
export class AddNhanvienComponent {
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

  chucVuList: any [] = [];
  ngOnInit(): void {
    
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
  this.nhanVien.taiKhoanNV.userName=this.nhanVien.maNV;
  // console.log(this.nhanVien)
  this.nhanvienService.addNhanVien(this.nhanVien, this.selectedFile ).subscribe(
    response => {
      console.log('Nhân viên đã được thêm thành công:', response);
      alert("Nhân viên  đã được thêm thành công");
      this.router.navigate(['/quanlynhanvien']); 
    },
    error => {
      console.error('Có lỗi xảy ra khi thêm Nhân viên:', error);
      alert("Có lỗi xảy ra khi thêm Nhân viên");
    }
  );
} 
goBack(): void {
  this.router.navigate(['/quanlynhanvien']); 
}
}
