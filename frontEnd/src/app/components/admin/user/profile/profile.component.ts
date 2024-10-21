import { Component } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { Router,RouterLink } from '@angular/router';
import { HoiVienService } from '../../../../services/hoivien.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    AsideComponent,
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  hoivienList: any[] = [];

  constructor(public hoiVienService:HoiVienService, private router: Router) {}

  ngOnInit(): void {
    this.loadhoivien();
  }

  loadhoivien(): void {
    this.hoiVienService.findAll().subscribe(
      (data: any[]) => {
        this.hoivienList = data;
        console.log('Danh sách sách:', this.hoivienList.length);
        
      },
      error => {
        console.error('Có lỗi xảy ra khi tải dữ liệu sách:', error);
      }
    );
  }
  edithoivien(hoivien: any): void {
    this.hoiVienService.hoiVien =hoivien; 
    console.log(hoivien);
    this.router.navigateByUrl("/AddUserComponentadmin"); 
  }

  
}
