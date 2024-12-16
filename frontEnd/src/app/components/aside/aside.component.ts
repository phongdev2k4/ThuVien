import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-aside',
  imports: [RouterLink, CommonModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {

  decodedToken: any = null;// Add decodedToken here

  constructor(public authService: AuthService, private storage:LocalStorageService, private router: Router) {}

  toggleCollapse(event: MouseEvent): void {
    // Prevent the default anchor behavior
    event.preventDefault();

    if (this.authService.roleMatch(['ADMIN'])) {
      // If the user has ADMIN role, toggle the collapse
      const subMenu = document.getElementById('userinfo');
      if (subMenu) {
        subMenu.classList.toggle('collapse');
      }
    } else {
      // If not, alert the user about the permission issue
      alert("You don't have permission to access this section.");
    }
  }

  signOut(){
    this.storage.remove('auth-key');
    this.storage.clear();
    this.decodedToken = null; 
    this.router.navigateByUrl('login')
  }
}
