import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { AsideComponent } from '../../aside/aside.component';
import { TheloaiService } from '../../../../services/theloai.service';
import { response } from 'express';
import { error } from 'console';

@Component({
    selector: 'app-add-theloai',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        AsideComponent
    ],
    templateUrl: './add-theloai.component.html',
    styleUrl: './add-theloai.component.css'
})
export class AddTheloaiComponent {

  constructor(public theloaiService: TheloaiService, private router: Router) {}

  onSubmit(): void {
    this.addTacGia();
   }

   addTacGia(): void {
      this.theloaiService.addTheLoai(this.theloaiService.theLoai).subscribe(
        response => {
          console.log(' thành công:', response);
          alert("thành công");
          this.router.navigateByUrl("/AdminListTheloai"); 
        },
        error => {
          console.error('Có lỗi xảy ra :', error);
          alert("Có lỗi xảy ra ");
        }
      );
  }
goBack(): void {
  this.router.navigate(['/AdminListTheloai']); 
}
}
