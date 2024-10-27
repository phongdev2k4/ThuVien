import { Component, OnInit } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { CommonModule } from '@angular/common';
import {Router, RouterLink } from '@angular/router';
import { KhoService } from '../../../../services/kho.service';

@Component({
  selector: 'app-kholist',
  standalone: true,
  imports: [
    CommonModule,
    AsideComponent,
    RouterLink
  ],
  templateUrl: './kholist.component.html',
  styleUrl: './kholist.component.css'
})
export class KholistComponent implements OnInit{
  constructor(private khoService:KhoService, private router: Router) {}
  KhoList: any[] = [];
  ngOnInit(): void {
    this.loadListKho();
  }
  loadListKho(): void {
    this.khoService.findAll().subscribe(
      data => {
        this.KhoList = data;
      },
      error => {
        console.error('Có lỗi xảy ra khi gọi API:', error);
      }
    );
  }
  deleteKho(makho: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa kho sách này?')) {
      this.khoService.deleteKho(makho).subscribe(
        response => {
          console.log('kho đã được xóa thành công:', response);
          this.loadListKho();
        },
        error => {
          console.error('Có lỗi xảy ra khi xóa kho:', error);
          alert('Có lỗi xảy ra khi xóa kho')
        }
      );
    }
  }
  editKho(kho : any): void {
    this.khoService.kho=kho;
    this.router.navigateByUrl("/updateKhoAdmin"); 
  }
}
