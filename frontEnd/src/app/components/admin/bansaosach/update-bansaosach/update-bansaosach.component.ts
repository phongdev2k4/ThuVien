import { Component } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BansaosachService } from '../../../../services/bansaosach.service';
import { SachService } from '../../../../services/sach.service';
import { KhoService } from '../../../../services/kho.service';

@Component({
  selector: 'app-update-bansaosach',
  standalone: true,
  imports: [
    AsideComponent,
    RouterLink,
    CommonModule,
    FormsModule
  ],
  templateUrl: './update-bansaosach.component.html',
  styleUrl: './update-bansaosach.component.css'
})
export class UpdateBansaosachComponent {
  SachList: any[] = [];
  khoList: any[] = [];
  constructor(public bansaosachService: BansaosachService,public sachService: SachService,public khoService: KhoService,private router: Router){} 

  ngOnInit(): void {
    this.loadSach();
    this.loadKho();
    
 }
  loadSach(): void {
    this.sachService.findAll().subscribe(
      data => {
        this.SachList = data;
        console.log(this.SachList);
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
   updateBanSaoSach(): void {
    this.bansaosachService.updateBanSaoSach(this.bansaosachService.bansaosach).subscribe(
      response => {
        alert("'Bản sao sách đã được cập nhật thành công");
        this.router.navigateByUrl("/BanSaoSachList"); 
      },
      error => {
        alert("Có lỗi xảy ra khi cập nhật sao sách");
      }
    );
   }
  goBack(): void {
    this.router.navigate(['/BanSaoSachList']); // Điều hướng về AuthorsAdmin
  }
}
