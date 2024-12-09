import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Router,RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { KhoService } from '../../../../services/kho.service';



@Component({
  selector: 'app-addkho',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './addkho.component.html',
  styleUrl: './addkho.component.css'
})
export class AddkhoComponent {
  constructor(public khoService: KhoService, private router: Router) {}
  public kho={
    tenKho: "",
    diaDiem: ""
}

 addKho(): void {
  this.khoService.addKho(this.kho).subscribe(
    response => {
      alert(" Thêm kho thành công");
      this.goBack(); 
    },
    error => {
      console.error('Có lỗi xảy ra khi thêm tác giả:', error);
      alert("Có lỗi xảy ra khi thêm kho");
    }
  );
}
  goBack(): void {
    this.router.navigate(['/ListkhoAdmin']); 
  }
}
