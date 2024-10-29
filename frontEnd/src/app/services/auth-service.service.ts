import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { IntergrationService } from './intergration.service';
import { Router, RouterLink } from '@angular/router';
import { LoginRequest } from '../models/login-request';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private decodedTokenSubject = new BehaviorSubject<any>(null); // Observable token
  decodedToken$ = this.decodedTokenSubject.asObservable();
  request: LoginRequest = new LoginRequest();
  helper = new JwtHelperService();

  constructor(
    private storage: LocalStorageService,
    private integration: IntergrationService,
    private router: Router
  ) {  this.loadToken(); }

  private loadToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) { // Ensure the browser environment
      const token = window.localStorage.getItem('auth-key'); // Use window.localStorage
      console.log('Loaded token:', token); // Debugging
  
      if (token) {
        const decoded = this.helper.decodeToken(token);
        console.log('Decoded token:', decoded); // Debugging
        this.decodedTokenSubject.next(decoded); // Emit decoded token
      } else {
        this.decodedTokenSubject.next(null); // Handle no token scenario
      }
    } else {
     // Log error for SSR or non-browser environment
    }
  }

  login(userName: string, password: string): Observable<any> {
    this.storage.remove('auth-key');

    if (userName === '' || password === '') {
      alert('Wrong Credentials');
      return new Observable(); // Return an empty observable if credentials are empty
    }

    this.request.userName = userName;
    this.request.password = password;

    return this.integration.doLogin(this.request);
  }

  handleLoginResponse(res: any): void {
    console.log("Received Response:", res.token);
    this.storage.set('auth-key', res.token);
    const decoded = this.helper.decodeToken(res.token);
    this.decodedTokenSubject.next(decoded); 

    const redirectUrl = localStorage.getItem('redirectUrl') || 'trangChu';
    localStorage.removeItem('redirectUrl');
    this.router.navigateByUrl(redirectUrl);
  }

  handleLoginError(err: any): void {
    console.log("Error Received Response:", err);
    this.storage.remove('auth-key');
    this.decodedTokenSubject.next(null); // Reset decodedToken on error
  }
 
  

}
