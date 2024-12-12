import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsideComponent } from '../../admin/aside/aside.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    AsideComponent,
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
