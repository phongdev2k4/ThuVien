import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
import { SweetAlertServiceService } from '../../../../services/sweet-alert-service.service';
import { NhanvienService } from '../../../../services/nhanvien.service';

@Component({
  selector: 'app-add-nhanvien',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-nhanvien.component.html',
  styleUrl: './add-nhanvien.component.css'
})
export class AddNhanvienComponent {
  constructor(private router: Router,private nhanvienService:NhanvienService,private sweetAlertService: SweetAlertServiceService) {}
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
  this.sweetAlertService.loading('Đang thêm nhân viên...');
  this.nhanvienService.addNhanVien(this.nhanVien, this.selectedFile).subscribe(
    response => {
      this.sweetAlertService.closeLoading();
      this.sweetAlertService.success("Thêm Thành Công")
      this.router.navigate(['/quanlynhanvien']);
    },
    error => {
      this.sweetAlertService.closeLoading();
      // Kiểm tra lỗi có phải là lỗi 400 không
      if (error.status === 400) {
        let errorMessage = error.error.message || error.error; // Lấy thông báo lỗi nếu có trong body JSON

        // Kiểm tra lỗi về tên đăng nhập hay email
        if (errorMessage === "Tên đăng nhập đã tồn tại!") {
          this.sweetAlertService.warning(errorMessage);
        } else if (errorMessage === "Email đã tồn tại!") {
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

}
