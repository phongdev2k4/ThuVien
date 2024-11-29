import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { PhieuMuonService } from '../../../../services/phieu-muon.service';
import { BansaosachService } from '../../../../services/bansaosach.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PhieuTraService } from '../../../../services/phieu-tra.service';

@Component({
  selector: 'app-list-phieu-tra',
  standalone: true,
  imports: [AsideComponent,CommonModule, FormsModule,RouterModule],
  templateUrl: './list-phieu-tra.component.html',
  styleUrl: './list-phieu-tra.component.css'
})
export class ListPhieuTraComponent {
  maHV: string = ''; // Bound to the input field
  phieuTraList: any[] = [];
  phieuTraTableList:any [] = [];
  phieuMuonList: any[] = []; // Array to store the search results
  constructor(private phieuTraService:PhieuTraService,private phieuMuonService:PhieuMuonService,public bansaosachService: BansaosachService,@Inject(PLATFORM_ID) private platformId: Object,private router: Router) {}
  BanSaoList: any[] = [];
  result: string | null = null;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Only fetch cover images if we are in the browser (not server-side)
      this.loadPhieuMuon();
      this.loadPhieuTra();
      console.log(this.phieuTraTableList)

    } else {
      console.log('Not running in the browser, skipping API call');
    }
  }
  loadPhieuMuon(): void {
    this.phieuMuonService.findAllDangMuon().subscribe(
      data => {
        this.phieuMuonList = data;
      },
      error => {
        console.error('Có lỗi xảy ra khi gọi API:', error);
      }
    );
  }
  
  searchPhieuTra(): void {
    if (this.maHV.trim()) { // Ensure the input is not empty
      this. phieuMuonService.getChiTietPhieuMuonByHoiVienId(this.maHV).subscribe(
        data => {
          this.phieuTraList = data; // Load the result into the table
          console.log(data)
        },
        error => console.error('Error fetching data:', error)
      );
    } else {
      alert('Vui lòng nhập mã hội viên');
    }
  }
  loadPhieuTra(){
    this. phieuTraService.findAll().subscribe(
      data => {
        this.phieuTraTableList = data;
        console.log(data);
      },
      error => {
        console.error('Có lỗi xảy ra khi gọi API:', error);
      }
    );
  }
  selectedPhieuTra: any = null;
  openModal(phieu: any): void {
    this.phieuTraService.findChiTietPhieuTraById(phieu.maPT).subscribe({
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
