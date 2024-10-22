import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsideComponent } from '../../aside/aside.component';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    AsideComponent,RouterLink
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent {

}
