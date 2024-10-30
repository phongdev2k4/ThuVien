import { Component, OnInit } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import {Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SachService } from '../../../../services/sach.service';
import { TheloaiService } from '../../../../services/theloai.service';
import { TacgiaService } from '../../../../services/tacgia.service';
import { SweetAlertServiceService } from '../../../../services/sweet-alert-service.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    AsideComponent,
    NgxSpinnerModule
    
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit {
  imagesToUpload: File[] = []; // Store multiple selected files
  imagePreviews: string[] = []; // Store preview URLs for selected images
  theloaiList: any[] = [];
  tacgiaList: any[] = [];
  selectedTheLoaiIds: string[] = [];
  loading: boolean = false; // Loading state



  constructor(public sachService: SachService,public theloaiService: TheloaiService,private tacgiaService: TacgiaService,private router: Router,private notificationService: SweetAlertServiceService){} 
  
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
onFileChange(event: any): void {
  const selectedFiles = Array.from(event.target.files) as File[];

  this. imagesToUpload = [...this. imagesToUpload, ...selectedFiles]; // Add to existing files
  this.updatePreviews(selectedFiles); // Generate previews for new files
}

// Generate image previews
private updatePreviews(files: File[]): void {
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e: any) => this.imagePreviews.push(e.target.result); // Store preview URLs
    reader.readAsDataURL(file);
  });
}
 
onSubmit(): void {
  this.loading = true; 
  this.sachService.addSach(this.sachService.sach, this.imagesToUpload).subscribe(
    (response) => {
      console.log('Book added successfully:', response);
      this.notificationService.success("Complete", () => {
        // Any additional action after success
      });
      this.goBack(); // Navigate back after success
    },
    (error) => {
      console.error('Error adding book:', error);
      this.loading = false; // Reset loading state on error
    },
    () => {
      this.loading = false; // Reset loading state on completion
    }
  );
}

  

  goBack(): void {
    this.router.navigate(['/bookadmin']); // Điều hướng về AuthorsAdmin
  }
  onCheckboxChange(event: any): void {
    const theLoaiId = String(event.target.value);
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add ID to the selected IDs array
      this. sachService.sach.theLoaiIds.push(theLoaiId);
    } else {
      // Remove ID if unchecked
      this.selectedTheLoaiIds = this.selectedTheLoaiIds.filter(
        (id) => id !== theLoaiId
      );
    }
  }
  
}
