import { Component } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [
    AsideComponent
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {

}
