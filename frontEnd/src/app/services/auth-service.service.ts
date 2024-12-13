import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { IntergrationService } from './intergration.service';
import { Router, RouterLink } from '@angular/router';
import { LoginRequest } from '../models/login-request';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { NhanvienService } from './nhanvien.service';
import { HoivienService } from './hoivien.service';

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
    private router: Router,
<<<<<<< HEAD
    private nhanvienService:NhanvienService,
    private hoivienService: HoivienService
    

    
=======
    private hoivienService: HoivienService,
    private nhanvienService:NhanvienService
>>>>>>> 3854c00292736ee617b3daa90044772ec186972f
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
    console.log("Received Response:", res.roles);
    this.storage.set('auth-key', res.token);
    this.storage.setRoles(res.roles);

    const decoded = this.helper.decodeToken(res.token);
    this.decodedTokenSubject.next(decoded); 

    this.TimThongTinNguoiDung();

    const redirectUrl = localStorage.getItem('redirectUrl') || 'trangChu';
    localStorage.removeItem('redirectUrl');
    this.router.navigateByUrl(redirectUrl);
  }

  handleLoginError(err: any): void {
    console.log("Error Received Response:", err);
    this.storage.remove('auth-key');
    this.decodedTokenSubject.next(null); // Reset decodedToken on error
  }
  public roleMatch(allowedRoles: string[]): boolean {
    const userRoles: string[] = this.storage.getRoles();
  
    if (!userRoles || userRoles.length === 0) {
      return false; // User has no roles, deny access
    }
  
    // Check if at least one user role is in the allowed roles
    return userRoles.some(role => allowedRoles.includes(role));
  }
 
  
  TimThongTinNguoiDung(): void {
    if(this.roleMatch(['ADMIN', 'EMPLOYEE'])){
      this.nhanvienService.findByUsername(this.storage.getIdUser()).subscribe(
        (data: any) => {
          this.storage.setTTNguoiDung(data);
        },
        (error) => {
        }
      )
    }else if(this.roleMatch(['CUS'])){
      this.hoivienService.findByUsername(this.storage.getIdUser()).subscribe(
        (data: any) => {
          this.storage.setTTNguoiDung(data);
        },
        (error) => {
        }
      );
    }
<<<<<<< HEAD
=======
   
  }
>>>>>>> 3854c00292736ee617b3daa90044772ec186972f
  

}
}
