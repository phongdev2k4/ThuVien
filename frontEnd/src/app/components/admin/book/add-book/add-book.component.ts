import { Component } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [
    AsideComponent,
    RouterLink
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {

}
