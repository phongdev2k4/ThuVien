import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PhieuMuonService } from '../../../../services/phieu-muon.service';


@Component({
  selector: 'app-table-phieu-muon',
  standalone: true,
  imports: [AsideComponent,CommonModule,RouterLink],
  templateUrl: './table-phieu-muon.component.html',
  styleUrl: './table-phieu-muon.component.css'
})
export class TablePhieuMuonComponent {
  phieuMuonList: any[] = []; // Mảng chứa danh sách phiếu mượn
  
  constructor(private router: Router,private phieuMuonService:PhieuMuonService,@Inject(PLATFORM_ID) private platformId: Object) {}

  editPhieuMuon(phieu: any): void {
    this.router.navigate(['/edit-phieu-muon', phieu.maPM]);
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Only fetch cover images if we are in the browser (not server-side)
      this.loadPhieuMuon();

    } else {
      console.log('Not running in the browser, skipping API call');
    }
  }
  loadPhieuMuon(): void {
    this.phieuMuonService.findAll().subscribe(
      data => {
        this.phieuMuonList = data;
      },
      error => {
        console.error('Có lỗi xảy ra khi gọi API:', error);
      }
    );
  }

  deletePhieuMuon(maPM: string): void {
    // Thực hiện logic xóa phiếu mượn
    if (confirm('Bạn có chắc chắn muốn xóa phiếu mượn này?')) {
      this.phieuMuonList = this.phieuMuonList.filter(phieu => phieu.maPM !== maPM);
      // Có thể gọi API để xóa phiếu mượn từ server nếu cần
    }
  }
  selectedPhieuMuon: any = null;
  openModal(phieu: any): void {
    this.phieuMuonService.findChiTietPhieuMuonById(phieu.maPM).subscribe({
      next: (data) => {
        this.selectedPhieuMuon = data;
        console.log('Chi Tiết Phiếu Trả:', this.selectedPhieuMuon );
      },
      error: (err) => {
        console.error('Error fetching Chi Tiết Phiếu Trả:', err);
      }
    });  
  }
}
