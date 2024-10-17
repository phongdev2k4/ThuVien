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
   
  theloaiList: any[] = [];
  tacgiaList: any[] = [];

  selectedFile: File | null = null; // Khởi tạo với giá trị null file 

  constructor(public sachService: SachService,public theloaiService: TheloaiService,private tacgiaService: TacgiaService,private router: Router){} 
  
  ngOnInit(): void {
    this.loadTheLoai();
    this.loadTacGia();
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
  selectedFileName: string | null = null; // ten file
  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files; // Lấy danh sách các tệp
    if (fileList.length > 0) {
      this.selectedFile= fileList[fileList.length - 1]; // Lấy tệp cuối cùng
      this.selectedFileName = this.selectedFile.name; // Cập nhật tên tệp
    }
  }
  onSubmit(): void {
      this.sachService.addSach(this.sachService.sach, this.selectedFile ).subscribe(
        response => {
          console.log('Sách đã được thêm thành công:', response);
          alert("Sách đã được thêm thành công");
          this.router.navigate(['/bookadmin']); 
        },
        error => {
          console.error('Có lỗi xảy ra khi thêm sách:', error);
          alert("Có lỗi xảy ra khi thêm sách");
        }
      );
    
    console.log(this.sachService.sach,this.selectedFile)
  }

  goBack(): void {
    this.router.navigate(['/bookadmin']); // Điều hướng về AuthorsAdmin
  }

  
}
