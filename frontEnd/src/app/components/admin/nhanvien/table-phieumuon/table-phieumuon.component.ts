
import { CommonModule } from '@angular/common';
import { Component, Pipe } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AsideComponent } from "../../aside/aside.component";

@Component({
  selector: 'app-table-phieumuon',
  standalone: true,
  imports: [AsideComponent,CommonModule,RouterLink],
  templateUrl: './table-phieumuon.component.html',
  styleUrl: './table-phieumuon.component.css'
})
export class TablePhieumuonComponent {

  phieuMuonList: any[] = []; // Mảng chứa danh sách phiếu mượn
  
  constructor(private router: Router) {}

  editPhieuMuon(phieu: any): void {
    this.router.navigate(['/edit-phieu-muon', phieu.maPM]);
  }

  deletePhieuMuon(maPM: string): void {
    // Thực hiện logic xóa phiếu mượn
    if (confirm('Bạn có chắc chắn muốn xóa phiếu mượn này?')) {
      this.phieuMuonList = this.phieuMuonList.filter(phieu => phieu.maPM !== maPM);
      // Có thể gọi API để xóa phiếu mượn từ server nếu cần
    }
  }
}
