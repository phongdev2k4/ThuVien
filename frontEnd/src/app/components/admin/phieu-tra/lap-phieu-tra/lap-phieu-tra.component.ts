
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { NotFoundException } from '@zxing/library';
import { PhieuMuonService } from '../../../../services/phieu-muon.service';
import { BansaosachService } from '../../../../services/bansaosach.service';
import { HoivienService } from '../../../../services/hoivien.service';
import { HoiVien } from '../../../../models/hoi-vien';
import { PhieuTraService } from '../../../../services/phieu-tra.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import Swal from 'sweetalert2';
import { SweetAlertServiceService } from '../../../../services/sweet-alert-service.service';
import { Observable } from 'rxjs';
import { PhieuTraDTO } from '../../../../models/phieu-tra-dto';


@Component({
    selector: 'app-lap-phieu-tra',
    standalone: true,
    imports: [ CommonModule, FormsModule],
    templateUrl: './lap-phieu-tra.component.html',
    styleUrl: './lap-phieu-tra.component.css'
})
export class LapPhieuTraComponent {
  constructor(private router: Router, private phieuMuonService: PhieuMuonService, public bansaosachService: BansaosachService, private hoiVienService: HoivienService, private phieuTraService: PhieuTraService, private storage: LocalStorageService, private sweetAlertService: SweetAlertServiceService,@Inject(PLATFORM_ID) private platformId: Object,private route: ActivatedRoute) { }
  phieuTra: any = {
    maPM: '',
    hoiVien: { maHV: '' },
    nhanVien: { maNV: '' },
    ngayLapPhieuTra: '',
    chiTietPhieuTraList: [
      // Khởi tạo một chi tiết sách trả mẫu
      { maSach: '', tenSach: '', ngayTra: '' }
    ]
  };
  phieuTraList: any[] = [];
  maHV!: string;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Only fetch cover images if we are in the browser (not server-side)
      this.route.queryParams.subscribe(params => {
        this.maHV = params['maHV'];
        console.log('Received maHV:', this.maHV);
      });
      this.loadChiTiet();

    } else {
      console.log('Not running in the browser, skipping API call');
    }
  }
  loadChiTiet():void {
    if (this.maHV.trim()) { // Ensure the input is not empty
      this. phieuMuonService.getChiTietPhieuMuonByHoiVienId(this.maHV).subscribe(
        data => {
          this.phieuTraList = data; // Load the result into the table
          console.log(this.phieuTraList[0].phieuMuon.maPM
          )
          console.log(data)
          this.phieuTra.hoiVien.maHV = this.phieuTraList[0].phieuMuon.hoiVien.maHV;
          this.phieuTra.nhanVien.maNV = this.phieuTraList[0].phieuMuon.nhanVien.maNV;
          this.phieuTra.maPM = this.phieuTraList[0].phieuMuon.maPM;
          this.phieuTra.ngayLapPhieuTra = this.formatDate(new Date());
        },
        error => console.error('Error fetching data:', error)
      );
    } else {
      alert('Vui lòng nhập mã hội viên');
    }
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
 


isOverdue(hanTraSach: string): boolean {
  const dueDate = new Date(hanTraSach); // Convert hanTraSach to a Date object
  const today = new Date(); // Get today's date
  // Ensure the comparison disregards time
  return dueDate.getTime() < today.setHours(0, 0, 0, 0);
}

  onSubmit(){
    
  }

  deleteChiTiet(index: number){
    if (index > -1) {
      this.phieuTra.chiTietPhieuTraList.splice(index, 1);
    }
  }

  goBack() {
    this.router.navigate(['/tablePhieuTra']); 
  }
  selectedPhieuTra: any;

openModal(phieuTra: any): void {
  this.selectedPhieuTra = phieuTra;
}
maVachArray: string[] = []; // Array to store Mã Vạch
statusArray: string[] = []; 
handledBooks1: Set<number> = new Set(); 
selectedStatus: string = ''; // To store the selected status from the dropdown

handledBooks: PhieuTraDTO[] = []; // Array to hold objects with maVach and status


saveStatuses(): void {
  if (this.selectedPhieuTra) {
    const maVach = this.selectedPhieuTra?.banSaoSach?.maVach;

    if (maVach && this.selectedStatus) {
      // Find if the maVach already exists in handledBooks
      const existingIndex = this.handledBooks.findIndex((book) => book.maVach === maVach);

      if (existingIndex !== -1) {
        // Update the existing entry
        this.handledBooks[existingIndex].status = this.selectedStatus;
      } else {
        // Add a new entry using the PhieuTraDTO class
        const newBook = new PhieuTraDTO(maVach, this.selectedStatus,  this.phieuTra.nhanVien.maNV);
        this.handledBooks.push(newBook);
      }

      console.log('Handled Books:', this.handledBooks);

      // Reset modal and dropdown
      this.selectedPhieuTra = null;
      this.selectedStatus = '';
    } else {
      alert('Vui lòng chọn trạng thái trước khi lưu.');
    }
  }
}

// Check if a book has already been handled
isBookHandled(maVach: string): boolean {
  return this.handledBooks.some((book) => book.maVach === maVach);
}
submitPhieuTra(): void {
  if (this.handledBooks.length === 0) {
    alert('Danh sách sách cần xử lý đang trống!');
    return;
  }
  this.phieuTraService.createPhieuTra(this.handledBooks).subscribe({
    next: (response) => {
      console.log('Response from backend:', response);
      alert('Phiếu trả đã được tạo thành công!');
      this.handledBooks = []; // Reset the array after successful submission
    },
    error: (error) => {
      console.error('Error occurred:', error);
      alert('Có lỗi xảy ra khi tạo phiếu trả. Vui lòng thử lại.');
    },
  });
}


}

