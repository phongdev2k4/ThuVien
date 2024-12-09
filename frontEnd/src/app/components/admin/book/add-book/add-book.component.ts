import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import {Router,RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  // imagesToUpload: File[] = []; // Store multiple selected files
  // imagePreviews: string[] = []; // Store preview URLs for selected images
  theloaiList: any[] = [];
  tacgiaList: any[] = [];
  selectedTheLoaiIds: string[] = [];
  imagesToUpload: { [key: number]: File | null } = { 1: null, 2: null, 3: null };
  imagePreviews: { [key: number]: string | null } = { 1: null, 2: null, 3: null };
  loading: boolean = false; // Loading state



  constructor(public sachService: SachService,public theloaiService: TheloaiService,private tacgiaService: TacgiaService,private router: Router,private notificationService: SweetAlertServiceService,@Inject(PLATFORM_ID) private platformId: Object){} 
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Only fetch cover images if we are in the browser (not server-side)
      this.loadTheLoai();
      this.loadTacGia();

    } else {
      console.log('Not running in the browser, skipping API call');
    }
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
// onFileChange(event: any): void {
//   const selectedFiles = Array.from(event.target.files) as File[];
//   this.imagesToUpload = [...this.imagesToUpload, ...selectedFiles]; // Add to existing files
//   this.updatePreviews(selectedFiles); // Generate previews for new files
// }

// Generate image previews
// private updatePreviews(files: File[]): void {
//   files.forEach((file) => {
//     const reader = new FileReader();
//     reader.onload = (e: any) => this.imagePreviews.push(e.target.result); // Store preview URLs
//     reader.readAsDataURL(file);
//   });
// }
   // Handle file selection
   onFileChange(event: any, fieldNumber: number): void {
    const file = event.target.files[0]; // Only one file is allowed per field
    if (file) {
      this.imagesToUpload[fieldNumber] = file; // Store the file
      this.updatePreview(file, fieldNumber); // Generate preview
    }
  }

  // Generate an  image preview
  private updatePreview(file: File, fieldNumber: number): void {
    const reader = new FileReader();
    reader.onload = (e: any) => (this.imagePreviews[fieldNumber] = e.target.result); // Store preview URL
    reader.readAsDataURL(file);
  }
onSubmit(): void {
  this.loading = true; 
  const images: File[] = Object.values(this.imagesToUpload).filter((img): img is File => img !== null);
  console.log(images); 
  this.sachService.addSach(this.sachService.sach,images).subscribe(
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
      console.log()
    } else {
      // Remove ID if unchecked
      this. sachService.sach.theLoaiIds = this. sachService.sach.theLoaiIds.filter(
        (id) => id !== theLoaiId
      );
    }
  }
  
}
