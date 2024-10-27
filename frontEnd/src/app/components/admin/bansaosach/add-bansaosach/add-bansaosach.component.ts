import { Component, OnInit } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SachService } from '../../../../services/sach.service';
import { BansaosachService } from '../../../../services/bansaosach.service';
import { KhoService } from '../../../../services/kho.service';

@Component({
  selector: 'app-add-bansaosach',
  standalone: true,
  imports: [
    AsideComponent,
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
  constructor(public bansaosachService: BansaosachService,public sachService: SachService,public khoService: KhoService,private router: Router){} 
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
    this.loadSach();
    this.loadKho();
    
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
    this.bansaosachService.addBanSaoSach(this.bansaosach,this.soLuong).subscribe(
      response => {
        console.log('bản sao sách đã được thêm thành công:', response);
        alert(" Bản sao sách đã được thêm thành công");
        this.router.navigateByUrl("/BanSaoSachList"); 
      },
      error => {
        console.error('Có lỗi xảy ra khi thêm tác giả:', error);
        alert("Có lỗi xảy ra khi thêm bản sao sách");
      }
    );
}
goBack(): void {
  this.router.navigate(['/BanSaoSachList']); // Điều hướng về AuthorsAdmin
}
}
