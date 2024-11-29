import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from '../services/local-storage.service';

export const authKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(LocalStorageService);
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);

    const token = storageService.get('auth-key');

    if (token) {
      if (jwtHelper.isTokenExpired(token)) {
        // If the token is expired, remove it from storage and navigate to login
        storageService.clear();
        alert("Phiên đăng nhập đã hết hạn,xin vui lòng đăng nhập lại ")
        router.navigate(['/login']);
        console.warn('Token expired. Redirecting to login.');
        return next(req); // Let the request fail gracefully, no token attached
      }

      // If the token is valid, attach it to the headers
      const modifiedReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

      return next(modifiedReq);
    }

    // If no token is found, proceed with the original request
    return next(req);
  };
