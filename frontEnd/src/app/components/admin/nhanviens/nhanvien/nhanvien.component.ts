import { Component } from '@angular/core';
import {Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AsideComponent } from '../../aside/aside.component';
import { NhanvienService } from '../../../../services/nhanvien.service';
@Component({
  selector: 'app-nhanvien',
  standalone: true,
  imports: [
    CommonModule,
    AsideComponent,
    RouterLink
  ],
  templateUrl: './nhanvien.component.html',
  styleUrl: './nhanvien.component.css'
})
export class NhanvienComponent {
  constructor(private NhanvienService:NhanvienService, private router: Router) {}

  NhaVienList: any[] = [];
  ngOnInit(): void {
    this.loadListNhanVien();
  }
  loadListNhanVien(): void {
    this.NhanvienService.getNhanVien().subscribe(
      data => {
        this.NhaVienList = data;
      },
      error => {
        console.error('Có lỗi xảy ra khi gọi API:', error);
      }
    );
  }
  goBack(): void {
    this.router.navigate(['/quanlynhanvien']); 
  }

  deleteNhanVien(maNV: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      this.NhanvienService.deleteNhanVien(maNV).subscribe(
        response => {
          console.log('Nhân Viên đã được xóa thành công:', response);
          this.loadListNhanVien(); 
        },
        error => {
          alert("Có lỗi xảy ra khi xóa nhân viên có thể liên kết khóa ngoại")
          console.error('Có lỗi xảy ra khi xóa sách:', error);
        }
      );
    }
  }
  
  editNhanVien(nhanvien: any): void {
    this.NhanvienService.nhanVien =nhanvien; 
    this.router.navigateByUrl("/updateNhanVien"); 
  }
}
