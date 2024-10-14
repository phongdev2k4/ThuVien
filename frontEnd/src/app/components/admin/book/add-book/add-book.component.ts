import { Component } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import {Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SachService } from '../../../../services/sach.service';

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
export class AddBookComponent {


  selectedFile: File | null = null; // Khởi tạo với giá trị null file 

  constructor(public sachService: SachService,private router: Router){} 

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
