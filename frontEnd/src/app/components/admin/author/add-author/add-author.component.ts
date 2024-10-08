import { Component } from '@angular/core';
import { AsideComponent } from '../../aside/aside.component';

@Component({
  selector: 'app-add-author',
  standalone: true,
  imports: [
    AsideComponent
  ],
  templateUrl: './add-author.component.html',
  styleUrl: './add-author.component.css'
})
export class AddAuthorComponent {

}
