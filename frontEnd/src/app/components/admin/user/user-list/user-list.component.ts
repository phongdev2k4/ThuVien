import { Component } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    AsideComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

}
