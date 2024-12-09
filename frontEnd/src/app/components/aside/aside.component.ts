import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  constructor(public authService: AuthService) {}
}
