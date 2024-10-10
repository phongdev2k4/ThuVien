import { Component } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [
    AsideComponent,
    RouterLink
  ],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {

}
