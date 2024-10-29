import { CommonModule } from '@angular/common';
import { Component,OnInit} from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { HoiVienService } from '../../../../services/hoivien.service';
import { AsideComponent } from '../../aside/aside.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    AsideComponent,CommonModule,RouterLink
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
    
    hoivienList: any[] = [];

  constructor(private hoiVienService:HoiVienService, private router: Router) {}

  ngOnInit(): void {
    this.loadhoivien();
  }

  loadhoivien(): void {
    this.hoiVienService.getHoiVien().subscribe(
      data => {
        this.hoivienList = data;
      },
      error => {
        console.error('Có lỗi xảy ra khi gọi API:', error);
      }
    );
  }
  edithoivien(hoivien: any): void {
    this.hoiVienService.hoiVien =hoivien; 
    console.log(hoivien);
    this.router.navigateByUrl("/AddUserComponentadmin"); 
  }
    
}
