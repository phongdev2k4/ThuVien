import { Component } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    AsideComponent
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {

}
