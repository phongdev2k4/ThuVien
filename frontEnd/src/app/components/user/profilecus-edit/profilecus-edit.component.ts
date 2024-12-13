import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service.service';
import { HoivienService } from '../../../services/hoivien.service';
import { SweetAlertServiceService } from '../../../services/sweet-alert-service.service';
import { TaikhoanService } from '../../../services/taikhoan.service';

<<<<<<< HEAD

=======
>>>>>>> 3854c00292736ee617b3daa90044772ec186972f
@Component({
  selector: 'app-profilecus-edit',
  standalone: true,
  imports: [    
    CommonModule,
    FormsModule,
    RouterLink],
  templateUrl: './profilecus-edit.component.html',
  styleUrl: './profilecus-edit.component.css'
})
export class ProfilecusEditComponent {
  constructor(private storage : LocalStorageService,private router : Router,private auth:AuthService,private hoivienService:HoivienService,private sweetAlertService: SweetAlertServiceService,private taikhoanService: TaikhoanService) {}
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
  formatTienNap(value: number): string {
    return value.toLocaleString('de-DE');  // Dùng 'de-DE' để phân cách hàng nghìn bằng dấu chấm
  }
  // Hàm xử lý chuỗi, tách trước dấu phẩy
    getImageUrl(): string {
      if(this.NguoiDung.hinhAnhHV!=null){
        return this.NguoiDung.hinhAnhHV.split(',')[0];  // Tách chuỗi trước dấu phẩy
      }
      return "./assets/images/user/1.jpg";
   }
   capNhatHoiVien(): void {
    const loadingSwal = this.sweetAlertService.loading('Đang cập nhật thông tin...');
    this.hoivienService.capnhatHoiVien(this.storage.getIdUser(),this.NguoiDung,this.file).subscribe(
      response => {
        this.sweetAlertService.closeLoading();
       this.sweetAlertService.success("Cập nhật Thành Công")
       this.auth.TimThongTinNguoiDung();
       this.loadTTNguoiDung();
       window.location.reload();
       
      },
      (error) => {
        this.sweetAlertService.closeLoading();
        this.file=null;
      }
    );
  }
  onFileChange(event: any): void {
    const fileList: FileList = event.target.files; 
    if (fileList.length > 0) {
      // Lấy file cuối cùng được chọn
      this.file = fileList[fileList.length - 1]; 
    }
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
