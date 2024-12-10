import { Component } from '@angular/core';
import { SweetAlertServiceService } from '../../../../services/sweet-alert-service.service';
import { HoivienService } from '../../../../services/hoivien.service';
import { Router,RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth-service.service';
@Component({
  selector: 'app-updatehoivien',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './updatehoivien.component.html',
  styleUrl: './updatehoivien.component.css'
})
export class UpdatehoivienComponent {
  constructor(private router: Router,private hoivienService:HoivienService,private sweetAlertService: SweetAlertServiceService,private auth:AuthService) {}
  hoiVien:any={};
  TienNap:any;
  ngOnInit(): void {
    this.hoiVien=this.hoivienService.hoiVien;
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
  this.sweetAlertService.loading('Đang cập nhật hội  viên');
  this.hoivienService.updateHoiVien(this.hoiVien, this.selectedFile ).subscribe(
    response => {
      this.sweetAlertService.closeLoading();
      this.sweetAlertService.success("Cập nhật Thành Công")
      this.auth.TimThongTinNguoiDung();
      this.router.navigate(['/hoivienlist']); 
    },
    error => {
      this.sweetAlertService.closeLoading();
      this.sweetAlertService.error("Cập nhật thất bại");
    }
  );
} 
  goBack(): void {
    this.router.navigate(['/hoivienlist']); 
  }
  formatTienNap(value: number): string {
   return value.toLocaleString('de-DE');
  }
}
