import { CommonModule } from '@angular/common';
import { AsideComponent } from '../aside/aside.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PhieuMuonService } from '../../../services/phieu-muon.service';
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { NotFoundException } from '@zxing/library';
import { BansaosachService } from '../../../services/bansaosach.service';

@Component({
  selector: 'app-phieu-tra',
  standalone: true,
  imports: [CommonModule, AsideComponent, FormsModule],
  templateUrl: './phieu-tra.component.html',
  styleUrl: './phieu-tra.component.css'
})
export class PhieuTraComponent {
  maHV: string = ''; // Bound to the input field
  phieuTraList: any[] = []; // Array to store the search results
  constructor(private phieuMuonService:PhieuMuonService,public bansaosachService: BansaosachService) {}
  BanSaoList: any[] = [];
  result: string | null = null;
  private codeReader = new BrowserMultiFormatReader();
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  
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

  startScanning(): void {
    this.codeReader.decodeFromVideoDevice(undefined, this.videoElement.nativeElement, (result, err) => {
      if (result) {
        this.result = result.getText(); // Lấy kết quả từ mã vạch
        this.TimTheoMaVach(this.result);
      } else if (err && !(err instanceof NotFoundException)) {
        console.error(err); // Xử lý lỗi nếu có
      }
    });
  }

  stopScanning(): void {
    const stream = this.videoElement.nativeElement.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach(track => track.stop()); // Dừng tất cả các track video
      this.videoElement.nativeElement.srcObject = null; // Ngắt kết nối video
    }
  }
  soLuongforCheck: number = 0;
  TimTheoMaVach(maVach: string): void {
    const index = this.BanSaoList.findIndex(banSao => banSao.maVach === maVach);
    if (index == -1) {
      this.bansaosachService.findByMaVach(maVach).subscribe(
        (data) => {
          if (data.soLuong123 < 0 ) {
            alert('Sach nay da out of stock .');
            return; // Stop here and do not push to BanSaoList
          }
          if(data.trangThaiMuon === "Đang mượn"){
            alert('Sach nay da co nguoi muon.');
            return; // Stop here and do not push to BanSaoList
          }
          this.BanSaoList.push(data);
          console.log(data)
       
   
        },
        (error) => {
          console.error('Có lỗi xảy ra khi tìm kiếm bản sao sách:', error);
        }
      );
    }else{
      alert("Sách"+" "+this.BanSaoList[index].sach.tenSach+" "+"Mã"+" "+this.BanSaoList[index].maBanSaoSach+" "+"đã có trong table")
    }

  }




}
