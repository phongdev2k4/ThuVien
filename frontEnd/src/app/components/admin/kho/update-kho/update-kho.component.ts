import { Component } from '@angular/core';
import { KhoService } from '../../../../services/kho.service';
import { CommonModule } from '@angular/common';
import { AsideComponent } from '../../aside/aside.component';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-kho',
  standalone: true,
  imports: [
    CommonModule,
    AsideComponent,
    FormsModule,
    RouterLink
  ],
  templateUrl: './update-kho.component.html',
  styleUrl: './update-kho.component.css'
})
export class UpdateKhoComponent {
  constructor(public khoService: KhoService, private router: Router) {}
  
  updatekho(): void {
    this.khoService.addKho(this.khoService.kho).subscribe(
      response => {
        alert("Cập nhật kho thành công");
        this.goBack();
      },
      error => {
        alert("Có lỗi xảy ra khi cập nhật kho");
      }
    );
   }

  goBack(): void {
    this.router.navigate(['/ListkhoAdmin']); 
  }
}
