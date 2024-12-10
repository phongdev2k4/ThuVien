import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public authService: AuthService,public router:Router,private storage:LocalStorageService,private cartService: CartService) {}
  decodedToken: any = null;// Add decodedToken here
  cartItems: any[] = [];

  ngOnInit(): void {
    this.authService.decodedToken$.subscribe((token) => {
      this.decodedToken = token;
      this.storage.setIdUser(  this.decodedToken.sub);
       // Update the token when it changes
    });
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  
  }

  signOut(){
    this.storage.remove('auth-key');
    this.storage.clear();
    this.decodedToken = null; 
    this.router.navigateByUrl('login')
  }
  goToLogin() {
    this.router.navigate(['/login']); // Programmatically navigate to the login route
  }


  removeFromCart(item: any,event: Event): void {
    event.stopPropagation(); 
    this.cartService.removeFromCart(item);
  }
}
