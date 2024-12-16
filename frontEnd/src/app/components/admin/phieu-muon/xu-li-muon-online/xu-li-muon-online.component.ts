import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhieuMuonService } from '../../../../services/phieu-muon.service';
import { BansaosachService } from '../../../../services/bansaosach.service';
import { HoivienService } from '../../../../services/hoivien.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { SweetAlertServiceService } from '../../../../services/sweet-alert-service.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinalBorrowedBook } from '../../../../models/final-borrowed-book';
import { XuLiMuonOnlineDTO } from '../../../../models/xu-li-muon-online-dto';

@Component({
  selector: 'app-xu-li-muon-online',
  imports: [CommonModule, FormsModule],
  templateUrl: './xu-li-muon-online.component.html',
  styleUrl: './xu-li-muon-online.component.css'
})
export class XuLiMuonOnlineComponent {
  phieuDangMuonList: any = { details: [] };
  currentDate: string = new Date().toISOString().split('T')[0];
  hanTra:Date = new Date();
  maHV: string = '';
  searchTerm: string = '';
  tenSachArray: string[]=[];
  constructor(private router: Router, private phieuMuonService: PhieuMuonService, public bansaosachService: BansaosachService, private hoiVienService: HoivienService, private storage: LocalStorageService, private sweetAlertService: SweetAlertServiceService,@Inject(PLATFORM_ID) private platformId: Object,private route: ActivatedRoute) { }
  idMuonOnline: number =0;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Only fetch cover images if we are in the browser (not server-side)
      this.route.queryParams.subscribe(params => {
        this.idMuonOnline = params['maPM'];
       
        
      });
      this.loadMuonOnline();

    } else {
      console.log('Not running in the browser, skipping API call');
    }
  }
  loadMuonOnline() :void{
    this.phieuMuonService.getMuonOnlineById(this.idMuonOnline).subscribe(
      data => {
        this.phieuDangMuonList = data;
        console.log(this.phieuDangMuonList)
        this.searchTerm = this.phieuDangMuonList.hoiVien.hoTen;
        this.maHV = this.phieuDangMuonList.hoiVien.maHV
      },
      error => {
        console.error('Có lỗi xảy ra khi gọi API:', error);
      }
    );
  }
  finalizeBorrowing() {
    if (!this.maHV || !this.searchTerm || this.phieuDangMuonList.length === 0) {
  alert('Please fill in all required fields and add at least one book to the table before creating the record.');
  return; // Stop the function if validation fails
}
  const ngayMuon = new Date(); // Today's date (Date object)
// Create a new Date object for "ngayTra"

this.tenSachArray = this.phieuDangMuonList.details.map((borrowedBook: any) => borrowedBook.banSaoSach.maBanSaoSach);
  const maNV = this.storage.getIdUser();
  const finalBook = new XuLiMuonOnlineDTO(
    this.maHV,
    this.idMuonOnline,
    this.tenSachArray,
    ngayMuon,
    this.hanTra,
    maNV
  );
  this.phieuMuonService.createPhieuMuonOnline(finalBook).subscribe({
    next: (response) => {
      console.log('PhieuMuon created successfully:', response);
      alert("Xử lí thành công")
      this.goBack();
      
      
    },
    error: (error) => {
      console.error('Error creating PhieuMuon:', error);
    }
  });
  
  console.log('Final Borrowed Books:', finalBook );
}
goBack() {
  this.router.navigate(['/MuonOnline']); 
}
}
