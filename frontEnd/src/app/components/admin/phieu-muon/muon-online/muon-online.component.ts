import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { PhieuMuonService } from '../../../../services/phieu-muon.service';
import { BansaosachService } from '../../../../services/bansaosach.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-muon-online',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './muon-online.component.html',
  styleUrl: './muon-online.component.css'
})
export class MuonOnlineComponent {
  phieuDangMuonList: any[] = [];
  phieuDaMuonList: any[] = [];
  constructor(private phieuMuonService:PhieuMuonService,public bansaosachService: BansaosachService,@Inject(PLATFORM_ID) private platformId: Object,private router: Router) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Only fetch cover images if we are in the browser (not server-side)
      this.loadDangMuonOnline();
      this.loadMuonOnline();

    } else {
      console.log('Not running in the browser, skipping API call');
    }
  }
  loadDangMuonOnline():void {
    this.phieuMuonService.findAllDangMuonOnline().subscribe(
      data => {
        this.phieuDangMuonList = data;
        console.log(this.phieuDangMuonList)
        
      },
      error => {
        console.error('Có lỗi xảy ra khi gọi API:', error);
      }
    );
  }
  loadMuonOnline():void{
    this.phieuMuonService.findAllMuonOnline().subscribe(
      data => {
        this.phieuDaMuonList = data;
        console.log(this.phieuDaMuonList)
        
      },
      error => {
        console.error('Có lỗi xảy ra khi gọi API:', error);
      }
    );
  }
  selectedPhieuMuon: any = null;
  openModal(phieu: any): void {
    this.phieuMuonService.findChiTietPhieuMuonOnlineById(phieu.id).subscribe({
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
