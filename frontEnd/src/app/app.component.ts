import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent  } from './components/header/header.component';
import {  FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    RouterLink,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  hideHeader = false; // Default value
  private routesToHideHeader: string[] = ['/login', '/register'];
  title = 'BookLand';
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      // Check if the current route matches any in the array
      this.hideHeader = this.routesToHideHeader.includes(this.router.url);
    });
  }
}
