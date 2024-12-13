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
<<<<<<< HEAD

=======
>>>>>>> 3854c00292736ee617b3daa90044772ec186972f
  ngOnInit(): void {
    this.authService.decodedToken$.subscribe((token) => {
      this.decodedToken = token;
      this.storage.setIdUser(  this.decodedToken.sub);
       // Update the token when it changes
    });
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
<<<<<<< HEAD
  
=======
>>>>>>> 3854c00292736ee617b3daa90044772ec186972f
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
  getLinkProfile(): string {
    if(this.authService.roleMatch(['ADMIN', 'EMPLOYEE'])){
      return "/Profilestaff"
     
    }else if(this.authService.roleMatch(['CUS'])){
      return "/Profilecus"
    }
   return "/Profilecus"
 }
    // Hàm xử lý chuỗi, tách trước dấu phẩy
    getImageUrl(): string {
      if(this.authService.roleMatch(['ADMIN', 'EMPLOYEE'])){
        if( this.storage.getTTNguoiDung().hinhAnhNV!=null||this.storage.getTTNguoiDung().hinhAnhNV!=''){
          return this.storage.getTTNguoiDung().hinhAnhNV.split(',')[0];
        }    
       
      }else if(this.authService.roleMatch(['CUS'])){
        if( this.storage.getTTNguoiDung().hinhAnhHV!=null || this.storage.getTTNguoiDung().hinhAnhNV!=''){
          return this.storage.getTTNguoiDung().hinhAnhHV.split(',')[0];  // Tách chuỗi trước dấu phẩy
        }       
      }
      return "./assets/images/user/1.jpg";
   }  

<<<<<<< HEAD

  removeFromCart(item: any,event: Event): void {
    event.stopPropagation(); 
    this.cartService.removeFromCart(item);
  }
=======
  onSearch(searchKey: string) {
     window.location.href = `/timkiemsach?key=${searchKey}`;
    }
    removeFromCart(item: any,event: Event): void {
      event.stopPropagation(); 
      this.cartService.removeFromCart(item);
    }
>>>>>>> 3854c00292736ee617b3daa90044772ec186972f
}
