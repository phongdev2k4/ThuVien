import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsideComponent } from '../aside/aside.component';
import { PhieuPhat } from '../../../models/phieu-phat';
import { PhieuPhatService } from '../../../services/phieu-phat.service';


@Component({
  selector: 'app-phieuphat',
  standalone: true,
  imports: [CommonModule, FormsModule, AsideComponent],
  templateUrl: './phieuphat.component.html',
  styleUrl: './phieuphat.component.css'
})
export class PhieuphatComponent {
  maHV: string = ''; // Initialized with an empty string
  maNV: string = ''; 
  maPT: string = ''; // Initialized with an empty string
  maVach: string = ''; // Initialized with an empty string
  soNgayQuaHan: number = 0;
  tienPhat: string = '0 VNĐ'; // Updated to display with denomination
  phieuPhat:PhieuPhat =  new PhieuPhat(); 
  phat:number = 0// Assuming the structure of your form data

  constructor(private router: Router, private route: ActivatedRoute,private phieuPhatService: PhieuPhatService) {}

  ngOnInit(): void {
    // Retrieve values from query parameters or router state
    this.route.queryParams.subscribe(params => {
      this.maHV = params['maHV'];
      this.maNV = params['maNV'];
      this.maVach = params['maVach'];
      this.maPT = params['maPT']
      this.soNgayQuaHan = +params['ngayQuaHan'] || 0; // Ensure a number
      this.calculateTienPhat(); // Initial calculation
    });

    console.log('Mã Hội Viên:', this.maHV);
    console.log('Mã Nhân Viên:', this.maNV);
  }

  // Method to calculate tienPhat
  calculateTienPhat(): void {
    this.phat = this.soNgayQuaHan * 2000;
    this.tienPhat = `${this.phat.toLocaleString('vi-VN')} VNĐ`; // Format to VND style
  }

  onSubmit(): void {
    this.phieuPhat.maHV= this.maHV 
    this.phieuPhat.maNV= this.maNV 
    this.phieuPhat.maPT= this.maPT 
    this.phieuPhat.soNgayQuaHan = this.soNgayQuaHan
    this.phieuPhat.tienPhat = this.phat

    this.phieuPhatService.createPhieuPhat(this.phieuPhat).subscribe({
      next: (response) => {
        alert('PhieuPhat created successfully');
        this.clear();
      },
      error: (error) => {
        console.error('Error creating PhieuPhat', error);
        // Handle error (e.g., display an error message)
      }
    });
  
  }

  goBack(): void {
    this.router.navigate(['/previous-page']); // Adjust route as necessary
  }
  clear(): void {
    this.maHV = '';
    this.maNV = '';
    this.maPT = '';
    this.soNgayQuaHan = null!;
    this.tienPhat = null!;
   // Reset the PhieuPhat object
  }
 
}
