import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsideComponent } from '../../aside/aside.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    AsideComponent,CommonModule,RouterLink
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
    danhsachUser : any [] = [];
    
}
