import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SachService } from '../../services/sach.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Sửa lại thành styleUrls
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    public router: Router,
    private storage: LocalStorageService,
    public sachService: SachService
  ) {}

  decodedToken: any = null;
  filtername: string = '';
  sachList: any[] = [];

  ngOnInit(): void {
    this.authService.decodedToken$.subscribe((token) => {
      this.decodedToken = token;
      this.loadSach();
    });
  }

  signOut() {
    this.storage.remove('auth-key');
    this.decodedToken = null;
    this.router.navigateByUrl('login');
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  loadSach(): void {
    this.sachService.findAll().subscribe(
      (data: any[]) => {
        this.sachList = data;
      },
      (error) => {
        console.error('Có lỗi xảy ra khi tải dữ liệu sách:', error);
      }
    );
  }
}
