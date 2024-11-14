import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { NotFoundException } from '@zxing/library';
import { BansaosachService } from '../../../../services/bansaosach.service';
@Component({
  selector: 'app-barcode-scanner',
  standalone: true,
  imports: [
    AsideComponent,
    RouterLink,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css']
})
export class BarcodeScannerComponent implements OnInit{
  constructor(public bansaosachService: BansaosachService,private router: Router){} 
  result: string | null = null;
  private codeReader = new BrowserMultiFormatReader();

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>; // Tham chiếu đến phần tử video
  ngOnInit() {
    this.getCurrentLocation();
    // this.getWeatherData(10.242983,105.635677);
  }
  BanSaoList: any[] = [];
   
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
  TimTheoMaVach(maVach: string): void {
    const index = this.BanSaoList.findIndex(banSao => banSao.maVach === maVach);
    if (index == -1) {
      this.bansaosachService.findByMaVach(maVach).subscribe(
        (data) => {
          this.BanSaoList.push(data);
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
  weatherData: any;
  getWeatherData(lat: number, lon: number) {
    this.bansaosachService.getWeather(lat, lon).subscribe(data => {
      this.weatherData = data;
      this.weatherData.main.temp=Math.round(this.weatherData.main.temp); 
      this.weatherData.weather[0].description=this.capitalizeFirstLetter( this.weatherData.weather[0].description); 
      console.log(this.weatherData)   
    }, error => {
      console.error('Error fetching weather data:', error);
    });
  }
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude; // Lấy vĩ độ
          const lon = position.coords.longitude; // Lấy kinh độ
          this.getWeatherData(lat, lon); // Gọi hàm lấy dữ liệu thời tiết
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  capitalizeFirstLetter(text: string): string { // viết chữ cái đầu thành hoa
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  
  // thời tiết end
}
