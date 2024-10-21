import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AsideComponent } from "../../aside/aside.component";

@Component({
  selector: 'app-table-nhanvien',
  standalone: true,
  imports: [AsideComponent,CommonModule,RouterLink],
  templateUrl: './table-nhanvien.component.html',
  styleUrl: './table-nhanvien.component.css'
})
export class TableNhanvienComponent {

  nhanVienList : any [] = [];

  constructor(private router: Router) {}

  editNhanvien(nhanvien: any): void {
    this.router.navigate(['/edit-phieu-muon', nhanvien.maNV]);
  }

  deleteNhanVien(maPM: string): void {
    
  }

}
