
import { Component, inject } from '@angular/core';
import { IntergrationService } from '../../services/intergration.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../models/login-request';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth-service.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private storage : LocalStorageService,private integration:IntergrationService,private router : Router,private authService: AuthService) {}
  userId?:string ='';
  userForm: FormGroup =  new FormGroup({
  userName: new FormControl('', Validators.required),
  password: new FormControl('', [Validators.required, Validators.minLength(4)])
});
login() {
  const formValue = this.userForm.value;
  this.authService.login(formValue.userName, formValue.password).subscribe({
    next: (res) => this.authService.handleLoginResponse(res),
    error: (err) => this.authService.handleLoginError(err)
  });
}

// router = inject(Router);

}
