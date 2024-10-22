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
  title = 'BookLand';

  constructor(public router: Router) {}

  // Method to check if the current route is login
  // isLoginRoute(): boolean {
  //   return this.router.url.includes('/login');  // Check if current route contains /login
  // }
  isAuthRoute(): boolean {
    return ['/login', '/register'].some(route => this.router.url.includes(route));
  }
  

}
