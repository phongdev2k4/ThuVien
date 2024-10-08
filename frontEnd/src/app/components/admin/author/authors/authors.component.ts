import { Component } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [
    AsideComponent
  ],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {

}
