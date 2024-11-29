import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsideComponent } from '../../aside/aside.component';
import { PhieuPhat } from '../../../../models/phieu-phat';
import { PhieuPhatService } from '../../../../services/phieu-phat.service';
import { PhieuTraService } from '../../../../services/phieu-tra.service';



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
  tienPhat: string = '0 VNĐ';
  moTa :string = '';
  tienPhatTong: string = '0 VNĐ'; // Updated to display with denomination
  phieuPhat123:PhieuPhat =  new PhieuPhat(); 
  phat:number = 0// Assuming the structure of your form data
  phieuTraTableList:any [] = [];
  TongTienPhat: number = 0; // Total fine amount
  TongTienPhatSach: number = 0; // Total fine amount

  constructor(private router: Router, private route: ActivatedRoute,private phieuPhatService: PhieuPhatService,private phieuTraService: PhieuTraService,@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.route.queryParams.subscribe(params => {
        this.maPT = params['maPT'];
        this.soNgayQuaHan = +params['soNgayQuaHan'] || 0; // Ensure a number
        console.log(this.soNgayQuaHan)
        this.calculateTienPhat();
      
      });
      this.loadPhieuTra(); 
    } else {
      console.log('Not running in the browser, skipping API call');
    }
  }
  
  // Method to calculate tienPhat
  calculateTienPhat(): void {
    this.phat = this.soNgayQuaHan * 2000;
    this.tienPhat = `${this.phat.toLocaleString('vi-VN')} VNĐ`; 
  // Format to VND style
  }
  loadPhieuTra(){
    const maPTNumber = Number(this.maPT);
    this.phieuTraService.findChiTietPhieuTraById(maPTNumber).subscribe(
      data => {
        this.phieuTraTableList = data;
        this.loadForm();
        console.log(data);
      },
      error => {
        console.error('Có lỗi xảy ra khi gọi API:', error);
      }
    );
  }
  loadForm(){
    this.maNV = this.phieuTraTableList[0].phieuTra.nhanVien.maNV;
    this.maHV = this.phieuTraTableList[0].phieuTra.hoiVien.maHV;
    this.TongTienPhat = this.calculateTongTienPhat();
    this.tienPhatTong = `${this.TongTienPhat.toLocaleString('vi-VN')} VNĐ`; 
    console.log(this.TongTienPhat)
    this.TongTienPhatSach = this.calculateTongTienPhatSach(); 

  }
  calculateTienPhatSach(trangThai: string,tien:number): number {
    switch (trangThai) {
      case 'Mất':
        return tien; // Fine for lost book
      case 'Hỏng':
        return 5000; // Fine for damaged book
      default:
        return 0; // No fine for other statuses
    }
  }
  

  onSubmit(): void {
    this.phieuPhat123.maHV= this.maHV 
    this.phieuPhat123.maNV= this.maNV 
    this.phieuPhat123.maPT= this.maPT 
    this.phieuPhat123.moTa= this.moTa
    this.phieuPhat123.soNgayQuaHan = this.soNgayQuaHan
    this.phieuPhat123.tienPhat = this.TongTienPhat

    this.phieuPhatService.createPhieuPhat(this.phieuPhat123).subscribe({
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
  calculateTongTienPhat(): number {
    let totalTienPhat = 0;

    // Loop through phieuTraTableList and calculate the fine for each book
    for (let phieu of this.phieuTraTableList) {
      totalTienPhat += this.calculateTienPhatSach(phieu.banSaoSach.trangThaiBaoQuan,phieu.banSaoSach.sach.tienSach);
    }

    // Add additional fine (this.phat) to the total
    totalTienPhat += this.phat;

    return totalTienPhat;
  }
  calculateTongTienPhatSach(): number {
    let totalTienPhat = 0;

    // Loop through phieuTraTableList and calculate the fine for each book
    for (let phieu of this.phieuTraTableList) {
      totalTienPhat += this.calculateTienPhatSach(phieu.banSaoSach.trangThaiBaoQuan,phieu.banSaoSach.sach.tienSach);
    }

    return totalTienPhat;
  }
 
}
