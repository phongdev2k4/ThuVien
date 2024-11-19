import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AsideComponent } from '../aside/aside.component';
import { HoivienService } from '../../../services/hoivien.service';
import { debounceTime } from 'rxjs';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HoiVien } from '../../../models/hoi-vien';
import { AddBookRes } from '../../../models/add-book-res';
import { SachService } from '../../../services/sach.service';
import bootstrap from '../../../../main.server';
import { PhieuMuon } from '../../../models/phieu-muon';
import { BansaosachService } from '../../../services/bansaosach.service';
import { Router,RouterLink } from '@angular/router';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { NotFoundException } from '@zxing/library';
import { FinalBorrowedBook } from '../../../models/final-borrowed-book';
import { LocalStorageService } from '../../../services/local-storage.service';
import { PhieuMuonService } from '../../../services/phieu-muon.service';




@Component({
  selector: 'app-phieu-muon',
  standalone: true,
  imports: [  AsideComponent,CommonModule,FormsModule,RouterLink],
  templateUrl: './phieu-muon.component.html',
  styleUrl: './phieu-muon.component.css'
})
export class PhieuMuonComponent {
  searchTerm: string = '';
  searchBook: string = '';
  maHV: string = '';
  suggestions: HoiVien[] = [];
  Books: AddBookRes[] = [];
  currentDate: string = new Date().toISOString().split('T')[0]; // Format the date
  selectedBooks: string[] = [];
  borrowedBooks: any[] = [];
  phieuMuon:PhieuMuon = new PhieuMuon();
  result: string | null = null;
  hanTra:Date = new Date();
  finalBorrowedBooks: FinalBorrowedBook[] = [];
  private codeReader = new BrowserMultiFormatReader();
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  constructor(private hoiVienService: HoivienService,private bookService:SachService,public bansaosachService: BansaosachService,private router: Router,private storage:LocalStorageService,private phieuMuonService: PhieuMuonService) {}
 

  BanSaoList: any[] = [];

  onIdInput(event: any): void {
    const id = event.target.value;
    if (id.length > 0) {
      this.hoiVienService.findById(id).subscribe((data: HoiVien) => {
        if (data) {
          // Set the Mã Thẻ
          this. searchTerm = data.hoTen
        }
      });
    }
  }
  searchBooks(): void {
    if (this.searchBook.trim()) {
      this.bookService.findBooksByName(this.searchBook).subscribe(
        (data: AddBookRes[]) => { // Ensure data is treated as an array
          this.Books = this.Books.concat(data); // Concatenate the new books into the existing array
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
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
  checkTenSachTonTai:string[] = [];
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
          if (this.checkTenSachTonTai.includes(data.sach.tenSach)) {
            alert('Sách nãy đã tìm thấy rồi.Hãy tìm sách khác !!');
            return; // Stop here and do not push to BanSaoList
        }
          this.BanSaoList.push(data);
          console.log(data)
          this.checkTenSachTonTai.push(data.sach.tenSach);
       
   
        },
        (error) => {
          console.error('Có lỗi xảy ra khi tìm kiếm bản sao sách:', error);
        }
      );
    }else{
      alert("Sách"+" "+this.BanSaoList[index].sach.tenSach+" "+"Mã"+" "+this.BanSaoList[index].maBanSaoSach+" "+"đã có trong table")
    }

  }
  deleteBanSaoSach(maBanSaoSach: number): void {
    const index = this.BanSaoList.findIndex(banSao => banSao.maBanSaoSach === maBanSaoSach);
  
    if (index !== -1) {
      this.BanSaoList.splice(index, 1); 
    }
    
  }
   // thời tiết

 
  capitalizeFirstLetter(text: string): string { // viết chữ cái đầu thành hoa
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  saveChanges() {
    const currentDate = new Date();
    const nextMonthDate = new Date();
    nextMonthDate.setMonth(currentDate.getMonth() + 1);

    const ngayMuon = currentDate.toISOString().split('T')[0];
    // const hanTra = nextMonthDate.toISOString().split('T')[0];

    this.borrowedBooks = this.BanSaoList.map(bansaosachf => {
      return {
        tenSach: bansaosachf.sach.tenSach,
        ngayMuon: ngayMuon,
        hanTra: this.hanTra,
        maSach:bansaosachf.maBanSaoSach
      };
    });

    console.log('Books to display in table:', this.selectedBooks);
  }
  
  finalizeBorrowing() {
      if (!this.maHV || !this.searchTerm || this.borrowedBooks.length === 0) {
    alert('Please fill in all required fields and add at least one book to the table before creating the record.');
    return; // Stop the function if validation fails
  }
    const ngayMuon = new Date(); // Today's date (Date object)
// Create a new Date object for "ngayTra"

    const tenSachArray = this.borrowedBooks.map(book => book.maSach);
    const maNV = this.storage.getIdUser();
    const finalBook = new FinalBorrowedBook(
      this.maHV,
      this.searchTerm,
      tenSachArray,
      ngayMuon,
      this.hanTra,
      maNV
    );
    this.phieuMuonService.postPhieuMuon(finalBook).subscribe({
      next: (response) => {
        console.log('PhieuMuon created successfully:', response);
        alert("thanh cong")
        this.maHV = "";
        this.searchTerm = "";
        this.borrowedBooks = [];
        this.BanSaoList = [];
        this.result = "";
        this.stopScanning();
      },
      error: (error) => {
        console.error('Error creating PhieuMuon:', error);
      }
    });
    
    console.log('Final Borrowed Books:', finalBook );
}

}
