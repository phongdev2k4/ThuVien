import { Component, OnInit } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import {Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SachService } from '../../../../services/sach.service';
import { TheloaiService } from '../../../../services/theloai.service';
import { TacgiaService } from '../../../../services/tacgia.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    AsideComponent,
    
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit {
  constructor(public sachService: SachService,public theloaiService: TheloaiService,private tacgiaService: TacgiaService,private router: Router){} 
  theloaiList: any[] = [];
  tacgiaList: any[] = [];
  
  ngOnInit(): void {
    this.loadTheLoai();
    this.loadTacGia();
    
 }

 loadTacGia(): void {
  this.tacgiaService.getTacGia().subscribe(
    data => {
      this.tacgiaList = data;
    },
    error => {
      console.error('Có lỗi xảy ra khi gọi API:', error);
    }
  )
}
loadTheLoai(): void {
  this.theloaiService.getTheLoai().subscribe(
    data => {
      this.theloaiList= data;
    },
    error => {
      console.error('Có lỗi xảy ra khi gọi API:', error);
    }
  );
}

  selectedFile: File | null = null; // Khởi tạo với giá trị null file 
  selectedFileName: string | null = null; // ten file
  onFileSelected(event: any): void {
  const fileList: FileList = event.target.files; // Lấy danh sách các tệp
  if (fileList.length > 0) {
    this.selectedFile= fileList[fileList.length - 1]; // Lấy tệp cuối cùng
    this.selectedFileName = this.selectedFile.name; // Cập nhật tên tệp
  }
}
 goBack(): void {
  this.router.navigate(['/bookadmin']); // Điều hướng về AuthorsAdmin
}
isChecked(maTheLoai: string): boolean {
  return this.sachService.sach.theLoais.some(tl => tl.maTheLoai === maTheLoai);
}
    onSubmit(): void {
      this.sachService.addSach(this.sachService.sach, this.selectedFile ).subscribe(
        response => {
          console.log('Sách đã được thêm thành công:', response);
          alert("Sách đã được thêm thành công");
          console.log(this.sachService.sach.theLoais)
          this.router.navigate(['/bookadmin']); 
        },
        error => {
          console.error('Có lỗi xảy ra khi thêm sách:', error);
          alert("Có lỗi xảy ra khi thêm sách");
        }
      );
    
    console.log(this.sachService.sach,this.selectedFile)
  }  
  onTheLoaiChange(maTheLoai: string) {
    const index = this.sachService.sach.theLoais.findIndex(tl => tl.maTheLoai === maTheLoai);
    if (index === -1) {
      // Nếu thể loại chưa có trong danh sách, thêm vào
      this.sachService.sach.theLoais.push({ maTheLoai });
    } else {
      // Nếu thể loại đã có trong danh sách, xóa khỏi danh sách
      this.sachService.sach.theLoais.splice(index, 1);
    }
  }
}
