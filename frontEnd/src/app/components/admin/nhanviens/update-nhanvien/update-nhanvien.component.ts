import { Component } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NhanvienService } from '../../../../services/nhanvien.service';
import { SweetAlertServiceService } from '../../../../services/sweet-alert-service.service';
import { AuthService } from '../../../../services/auth-service.service';
@Component({
  selector: 'app-update-nhanvien',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './update-nhanvien.component.html',
  styleUrl: './update-nhanvien.component.css'
})
export class UpdateNhanvienComponent {
  constructor(private router: Router,private nhanvienService:NhanvienService,private sweetAlertService: SweetAlertServiceService,private auth:AuthService) {}
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
        authorities: []
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
  this.sweetAlertService.loading('Đang cập nhật nhân viên');
  this.nhanvienService.updateNhanVien(this.nhanVien, this.selectedFile ).subscribe(
    response => {
      this.sweetAlertService.closeLoading();
      this.sweetAlertService.success("Cập nhật Thành Công")
      this.auth.TimThongTinNguoiDung();
      this.router.navigate(['/quanlynhanvien']); 
    },
    error => {
      this.sweetAlertService.closeLoading();
      this.sweetAlertService.error("Cập nhật thất bại");
    }
  );
} 
goBack(): void {
  this.router.navigate(['/quanlynhanvien']); 
}
  // Hàm xử lý sự kiện thay đổi trạng thái checkbox
  onRoleChange(event: any, roleId: string, roleName: string) {
    const authorities = this.nhanVien.taiKhoanNV.authorities;

    // Kiểm tra xem checkbox được chọn hay không
    if (event.target.checked) {
      // Nếu chọn, thêm đối tượng chucVu vào authorities
      authorities.push({
        chucVu: {
          id: roleId,
          tenChucVu: roleName
        }
      });
    } else {
      // Nếu bỏ chọn, loại bỏ đối tượng chucVu khỏi authorities
      const index = authorities.findIndex((role: any) => role.chucVu.id === roleId);
      if (index !== -1) {
        authorities.splice(index, 1);  // Xóa đối tượng tại index tìm được
      }
    }

  }
  isRoleChecked(roleId: string): boolean {
    // Kiểm tra xem vai trò roleId có trong authorities không
    return this.nhanVien.taiKhoanNV.authorities.some(
      (authority: any) => authority.chucVu.id === roleId
    );
  }
}
