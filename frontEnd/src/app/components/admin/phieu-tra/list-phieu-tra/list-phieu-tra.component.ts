import { Component } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { PhieuMuonService } from '../../../../services/phieu-muon.service';
import { BansaosachService } from '../../../../services/bansaosach.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-phieu-tra',
  standalone: true,
  imports: [AsideComponent,CommonModule, FormsModule],
  templateUrl: './list-phieu-tra.component.html',
  styleUrl: './list-phieu-tra.component.css'
})
export class ListPhieuTraComponent {
  maHV: string = ''; // Bound to the input field
  phieuTraList: any[] = []; // Array to store the search results
  constructor(private phieuMuonService:PhieuMuonService,public bansaosachService: BansaosachService) {}
  BanSaoList: any[] = [];
  result: string | null = null;
 
  
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

}
