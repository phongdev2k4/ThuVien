import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { AuthService } from '../../../services/auth-service.service';
import { TaikhoanService } from '../../../services/taikhoan.service';
import { SweetAlertServiceService } from '../../../services/sweet-alert-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { NhanvienService } from '../../../services/nhanvien.service';

@Component({
  selector: 'app-profilestaff-edit',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    RouterLink],
  templateUrl: './profilestaff-edit.component.html',
  styleUrl: './profilestaff-edit.component.css'
})
export class ProfilestaffEditComponent {
  constructor(private storage : LocalStorageService,private router : Router,private auth:AuthService,private sweetAlertService: SweetAlertServiceService,private taikhoanService: TaikhoanService,private nhanvienService:NhanvienService) {}
  NguoiDung: any ;
  username: string="";
  file: File | null = null;
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  ngOnInit(): void {
    this.auth.TimThongTinNguoiDung();
    this.loadTTNguoiDung();
  }
  loadTTNguoiDung(): void {
    this.file=null;
    this.username=this.storage.getIdUser();
    this.NguoiDung=this.storage.getTTNguoiDung();
  }
  getImageUrl(image:string): string {
    if(image!=null){
      return image.split(',')[0];  // Tách chuỗi trước dấu phẩy
    }
    return "./assets/images/user/1.jpg";
 }
 onFileChange(event: any): void {
  const fileList: FileList = event.target.files; 
  if (fileList.length > 0) {
    // Lấy file cuối cùng được chọn
    this.file = fileList[fileList.length - 1]; 
  }
}
capNhatNhanVien(): void {
  this.sweetAlertService.loading('Đang cập nhật thông tin...');
  this.nhanvienService.capnhatNhanVien(this.storage.getIdUser(),this.NguoiDung,this.file).subscribe(
    response => {
      this.auth.TimThongTinNguoiDung();
      this.loadTTNguoiDung();
      this.sweetAlertService.closeLoading();
     this.sweetAlertService.success("Cập nhật Thành Công")
      window.location.reload();

    },
    (error) => {
      this.auth.TimThongTinNguoiDung();
      this.loadTTNguoiDung()
      this.sweetAlertService.closeLoading();
      this.file=null;
      
    }
  );
}
goBack(): void {
  this.router.navigate(['/trangChu']); 
  window.scrollTo(0, 0);
}
    // Hàm gọi khi form được submit
    DoiMatKhau(passwordForm: any): void {
      if (passwordForm.valid) {
        this.taikhoanService.changePassword(this.storage.getIdUser(), this.currentPassword, this.newPassword).subscribe(
          (response) => {
            this.sweetAlertService.success(response)
            passwordForm.reset();
            this.currentPassword = '';
            this.newPassword= '';
            this.confirmPassword = '';
          },
          (error) => {
            this.sweetAlertService.error(error.error)
          }
        );
    }else {
      this.sweetAlertService.warning("Dữ liệu form không hợp lệ")
      }
    }
}
