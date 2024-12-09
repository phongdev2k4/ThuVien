import { Component, OnInit } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { AsideComponent } from '../../aside/aside.component';
import { TheloaiService } from '../../../../services/theloai.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-theloai',
    standalone: true,
    imports: [
        CommonModule,
        AsideComponent,
        RouterLink
    ],
    templateUrl: './theloai.component.html',
    styleUrl: './theloai.component.css'
})
export class TheloaiComponent implements OnInit{
  theloaiList: any[] = [];
  constructor(private TheloaiService:TheloaiService, private router: Router) {}
  ngOnInit(): void {
    this.loadTheLoai();
 }

 loadTheLoai(): void {
  this.TheloaiService.getTheLoai().subscribe(
    data => {
      this.theloaiList= data;
    },
    error => {
      console.error('Có lỗi xảy ra khi gọi API:', error);
    }
  );
}
editTheLoai(theloaif: any): void {
  this.TheloaiService.theLoai =theloaif; 
  this.router.navigateByUrl("/AdminAddTheloai"); 
}

deleteTheLoai(maTheLoai: string): void {
  if (confirm('Bạn có chắc chắn muốn xóa thể loại này?')) {
    this.TheloaiService.deleteTheLoai(maTheLoai).subscribe(
      response => {
        console.log('Thể loại đã được xóa thành công:', response);
        this.loadTheLoai(); // Tải lại danh sách tác giả
      },
      error => {
        console.error('Có lỗi xảy ra khi xóa thể loại:', error);
      }
    );
  }
}
}
