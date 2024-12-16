import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PhieuPhatService } from '../../../../services/phieu-phat.service';
import { PhieuTraService } from '../../../../services/phieu-tra.service';

@Component({
    selector: 'app-table-phieuphat',
    standalone: true,
    imports: [ FormsModule, CommonModule, RouterLink],
    templateUrl: './table-phieuphat.component.html',
    styleUrl: './table-phieuphat.component.css'
})
export class TablePhieuphatComponent {
  phieuPhatList: any[] = []; 
  phieuPhatTableList: any[] = []; // Danh sách phiếu phạt

  constructor(private phieuPhatService: PhieuPhatService,private phieuTraService: PhieuTraService,@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Only fetch cover images if we are in the browser (not server-side)
      this.getPhieuPhatList();
      this.loadPhieuPhat()

    } else {
      console.log('Not running in the browser, skipping API call');
    }  // Lấy danh sách phiếu phạt khi component khởi tạo
  }
  phieuTraViPhamList: any[] = [];
   existingMaPTs = new Set(); 
  getPhieuPhatList(): void {
   // This will store maPTs that are already in the list
    this.phieuPhatService.getAllPhieuTraViPham().subscribe({
      next: (data) => {
        this.phieuPhatList = []; // Clear the list before adding items
        data.forEach((phieu: any) => {
          // Skip if maPT already exists in the list
          if (this.existingMaPTs.has(phieu.maPT)) {
            return; // Skip this iteration if maPT is already present
          }
  
          const soNgayQuaHan = this.calculateDaysOverdue(
            new Date(phieu.ngayLapPhieuTra),
            new Date(phieu.phieuMuon.hanTraSach)
          );
  
          // Fetch the chiTietPhieuTra by maPT
          this.phieuTraService.findChiTietPhieuTraById(phieu.maPT).subscribe({
            next: (chiTietData) => {
              // Count how many banSaoSach entries have trangThaiBaoQuan != "Mới"
              const soSachGapVanDe = this.countBanSaoSachWithIssues(chiTietData);
  
              // Mark this maPT as added to prevent duplicates
              this.existingMaPTs.add(phieu.maPT);
  
              // Push the new phieuPhat item to the list
              this.phieuPhatList.push({
                ...phieu,
                soNgayQuaHan,
                soSachGapVanDe,
              });
            },
            error: (err) => {
              console.error('Error fetching ChiTietPhieuTra data:', err);
            },
          });
        });
        console.log(this.phieuPhatList); // Debug log
      },
      error: (err) => {
        console.error('Error fetching PhieuPhat data:', err);
      },
    });
  }
  
  calculateDaysOverdue(ngayTra: Date, ngayMuon: Date): number {
    // Reset the time portion of both dates to midnight (00:00:00)
    const startOfDayTra = new Date(ngayTra);
    startOfDayTra.setHours(0, 0, 0, 0); // Set the time to 00:00:00
    
    const startOfDayMuon = new Date(ngayMuon);
    startOfDayMuon.setHours(0, 0, 0, 0); // Set the time to 00:00:00
    
    // Calculate the difference in time between the start of the two days
    const diffTime = startOfDayTra.getTime() - startOfDayMuon.getTime();
    
    // Calculate the number of days (rounded up to account for any remaining hours)
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    console.log("ngayTra (start of day): " + startOfDayTra);
    console.log("ngayMuon (start of day): " + startOfDayMuon);
    console.log("diffTime (ms): " + diffTime);
    console.log("diffDays: " + diffDays);
  
    // If the difference is negative, set diffDays to 0
    if (diffTime < 0) {
      diffDays = 0;
      console.log("diffDays set to 0 because diffTime is negative");
    }
  
    return diffDays;
  }
  
  
  countBanSaoSachWithIssues(chiTietData: any): number {
    let count = 0;
    chiTietData.forEach((item: any) => {
      if (item.banSaoSach && item.banSaoSach.trangThaiBaoQuan !== 'Mới') {
        count++;
      }
    });
    return count;
  }
  loadPhieuPhat(){
    this.phieuPhatService.findAll().subscribe(
      data => {
        this.phieuPhatTableList = data;
        console.log(data);
      },
      error => {
        console.error('Có lỗi xảy ra khi gọi API:', error);
      }
    );
  }
  loadChiTietPhieuPhat(){
    this.phieuPhatService.findAll().subscribe(
      data => {
        this.phieuPhatTableList = data;
        console.log(data);
      },
      error => {
        console.error('Có lỗi xảy ra khi gọi API:', error);
      }
    );
  }
  selectedPhieuTra: any = null;
  openModal(phieuPhat: any): void {
    this.phieuPhatService.getChiTietPhieuPhatById(phieuPhat.maPhieuPhat).subscribe({
      next: (data) => {
        this.selectedPhieuTra = data;
        console.log('Chi Tiết Phiếu Trả:', this.selectedPhieuTra );
      },
      error: (err) => {
        console.error('Error fetching Chi Tiết Phiếu Trả:', err);
      }
    });  
  }
}
