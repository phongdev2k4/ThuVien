import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SachService } from '../../../../services/sach.service';
import { BansaosachService } from '../../../../services/bansaosach.service';
import { KhoService } from '../../../../services/kho.service';
import { SweetAlertServiceService } from '../../../../services/sweet-alert-service.service';

@Component({
    selector: 'app-add-bansaosach',
    standalone: true,
    imports: [
        RouterLink,
        CommonModule,
        FormsModule
    ],
    templateUrl: './add-bansaosach.component.html',
    styleUrl: './add-bansaosach.component.css'
})
export class AddBansaosachComponent implements OnInit{
  SachList: any[] = [];
  khoList: any[] = [];
  constructor(public bansaosachService: BansaosachService,public sachService: SachService,public khoService: KhoService,private router: Router,@Inject(PLATFORM_ID) private platformId: Object,private sweetAlertService: SweetAlertServiceService){} 
  public bansaosach ={
    sach: {
      maSach: "" 
  },
  kho: {
      "maKho": 0  
  },
  trangThaiMuon: "",
  trangThaiBaoQuan: ""

}
public soLuong = 1;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Only fetch cover images if we are in the browser (not server-side)
      this.loadSach();
      this.loadKho();

    } else {
      console.log('Not running in the browser, skipping API call');
    }
    
 }

 loadSach(): void {
  this.sachService.findAll().subscribe(
    data => {
      this.SachList = data;
    },
    error => {
      console.error('Có lỗi xảy ra khi gọi API:', error);
    }
  )
 }
 loadKho(): void {
  this.khoService.findAll().subscribe(
    data => {
      this.khoList = data;
    },
    error => {
      console.error('Có lỗi xảy ra khi gọi API:', error);
    }
  )
 }
 addBanSaoSach(): void {
  this.sweetAlertService.loading('Đang thêm bản cứng sách...');
    this.bansaosachService.addBanSaoSach(this.bansaosach,this.soLuong).subscribe(
      response => {
        this.sweetAlertService.closeLoading();
        this.sweetAlertService.success("Thêm Thành Công")
        this.router.navigateByUrl("/BanSaoSachList"); 
      },
      error => {
        console.error('Có lỗi xảy ra khi thêm bản cứng:', error);
        this.sweetAlertService.error("Lỗi");
      }
    );
}
goBack(): void {
  this.router.navigate(['/BanSaoSachList']); // Điều hướng về AuthorsAdmin
}

}
