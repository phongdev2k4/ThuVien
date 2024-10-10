import { Component } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';
import { routes } from '../../../../app.routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    AsideComponent,
    RouterLink
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {

}
