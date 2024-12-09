import { Component } from '@angular/core';
import { HoivienService } from '../../../../services/hoivien.service';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
@Component({
  selector: 'app-tuychon',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './tuychon.component.html',
  styleUrl: './tuychon.component.css'
})
export class TuychonComponent {
  constructor(public hoivienService:HoivienService, private router: Router) {}
  ngOnInit(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
