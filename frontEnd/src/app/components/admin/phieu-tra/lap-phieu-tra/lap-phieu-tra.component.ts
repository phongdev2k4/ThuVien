
import { AsideComponent } from '../../aside/aside.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-lap-phieu-tra',
  standalone: true,
  imports: [AsideComponent, CommonModule, FormsModule],
  templateUrl: './lap-phieu-tra.component.html',
  styleUrl: './lap-phieu-tra.component.css'
})
export class LapPhieuTraComponent {
  BanSaoList: any[] = [];
  result: string | null = null;
  private codeReader = new BrowserMultiFormatReader();
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  maHV: string = '';
  maHV123: string = ''; // The value of the input
  suggestions: any[] = [];
  isSuggestionSelected: boolean = false;
  scannedResults: string[] = [];
  maNV: string = '';
  hanTra: Date = new Date();


  constructor(private router: Router, private phieuMuonService: PhieuMuonService, public bansaosachService: BansaosachService, private hoiVienService: HoivienService, private phieuTraService: PhieuTraService, private storage: LocalStorageService, private sweetAlertService: SweetAlertServiceService) { }

  goBack() {
    this.router.navigate(['/tablePhieuTra']);
  }
  // startScanning(): void {
  //   this.codeReader.decodeFromVideoDevice(undefined, this.videoElement.nativeElement, (result, err) => {
  //     if (result) {
  //       this.result = result.getText(); // Lấy kết quả từ mã vạch
  //       this.scannedResults.push(this.result);
  //       this.maNV = this.storage.getIdUser();
  //       this.LapPhieuMuon( this.maNV,this.scannedResults);
  //     } else if (err && !(err instanceof NotFoundException)) {
  //       console.error(err); // Xử lý lỗi nếu có
  //     }
  //   });
  // }
  startScanning(): void {
    this.codeReader.decodeFromVideoDevice(undefined, this.videoElement.nativeElement, (result, err) => {
      if (result) {
        this.result = result.getText(); // Get the barcode result
        this.maNV = this.storage.getIdUser();
        console.log(this.result)
        console.log(this.maHV123)
        if (this.maHV123 && this.result) {
          this.checkAndProcessPhieuTra(this.maHV123, this.result);
        } else {
          console.error('maHV or result is null.');
          alert('Mã hội viên hoặc mã vạch không hợp lệ.');
        }
        const returnDate = new Date();

      } else if (err && !(err instanceof NotFoundException)) {
        console.error(err); // Handle error if it occurs
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
  checkAndProcessPhieuTra(maHV: string, maVach: string): void {
    if (this.scannedResults.includes(maVach)) {
      console.log(`Mã vạch ${maVach} đã được quét.`);
      alert(`Mã vạch ${maVach} đã được quét. Vui lòng quét mã khác.`);
      return;
    // Exit the method if maVach is already scanned
    }
  
    this.phieuMuonService.getPhieuMuonByHoiVienId(maHV, maVach).subscribe({
      next: (response) => {
        // Get the due date (hanTraSach) from the response and convert it to a Date object
        if (Array.isArray(response) && response.length === 0) {
          console.error('No data found for the given maNV and maVach.');
          alert('Không tìm thấy dữ liệu cho mã hoi viên hoặc mã vạch này.');
          return; // Exit the method if response is empty
        }
        this.scannedResults.push(maVach); // Save to scanned results
          this.sweetAlertService.confirm('Bạn có muốn scan thêm sách không ?')
            .then((willAddMore) => {
              if (willAddMore) {
                this.startScanning();
              } else {
                // If user selects "Cancel," process the scanned results
                this.LapPhieuMuon(this.maNV, this.scannedResults);
               

              }
            });
      },
      error: (error) => {
        console.error('Error checking PhieuMuon:', error);
        alert("Có lỗi xảy ra khi kiểm tra Phiếu Mượn.");
      }
    });
  }

  // Helper function to check if the return date is past the due date
  checkIfOverdue(returnDate: Date, hanTra: Date): boolean {
    return returnDate > hanTra;
  }






  LapPhieuMuon(maNV: string, maVach: string[]): void {
    this.phieuTraService.createPhieuTra(maNV, maVach).subscribe({
      next: (response) => {
        console.log('PhieuTra created:', response);
        const hanTra = new Date(response.phieuMuon.hanTraSach);
        const returnDate = new Date(response.ngayLapPhieuTra);
        const differenceInMilliseconds = returnDate.getTime() - hanTra.getTime();
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        console.log(this.maHV123)
         // Check if the book is overdue by comparing the due date with the current date
         const isOverdue = this.checkIfOverdue(returnDate, hanTra);

         if (isOverdue) {         
          this.sweetAlertService.confirm('Phiếu này đã quá hạn mượn.Bạn có muốn lập phiếu phạt không ??')
          .then((willAddMore) => {
            if (willAddMore) {
              this.router.navigate(['/PhieuPhat'], {
                          queryParams: {  
                            maHV: this.maHV123,
                            maNV: this.maNV,
                            maVach: this.result,
                            ngayQuaHan: differenceInDays,
                            maPT:response.maPT

                          }
                        });
             
            } else {
              this.result = '';
              this.maHV123 = '';
              this.maHV = '';
              this.scannedResults = [];
              this.sweetAlertService.success("Thêm Thành Công");
            }
          });
              
                
          
         }
         else{
          this.result = '';
              this.maHV123 = '';
              this.maHV = '';
              this.scannedResults = [];
              this.sweetAlertService.success("Thêm Thành Công");
         }


      },
      error: (error) => {
        console.error('Error creating PhieuTra:', error);
        alert("Co loi xay ra khi tim sach")
        this.scannedResults = [];

      }
    });

  }
  onSearch(event: any) {
    const id = this.maHV.trim();
    if (id.length > 0) {
      // Modify this line to reflect that you're receiving a single HoiVien object
      this.hoiVienService.findById(id).subscribe((data: HoiVien) => {  // Expecting HoiVien object, not an array
        if (data) {
          // If data is found, set the suggestions to show `maHV` and `hoTen`
          this.suggestions = [{
            maHV: data.maHV,
            hoTen: data.hoTen
          }];
        } else {
          this.suggestions = []; // Clear suggestions if no data found
        }
      });
    } else {
      this.suggestions = []; // Clear suggestions if input is empty
    }
  }


  // Method to handle the selection of a suggestion
  onSelect(suggestion: any) {
    this.maHV = suggestion.maHV + "-" + suggestion.hoTen;
    this.maHV123 = suggestion.maHV; // Set the selected maHV to the input field
    this.suggestions = []; // Clear suggestions after selection
    this.isSuggestionSelected = true;
  }



}
