
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { routes } from './app.routes';
import { routesAdmin } from './components/admin/admin.routes';
import { routesNhanvien } from './components/admin/nhanvien/nhanvien.routes';
import { authKeyInterceptor } from './interceptors/auth-key.interceptor'

const combinedRoutes = [...routes, ...routesAdmin, ...routesNhanvien];

export function tokenGetter() {
  return localStorage.getItem('auth-key');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(combinedRoutes),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),  // Sử dụng fetch API cho hiệu suất tốt hơn
      withInterceptors([authKeyInterceptor]) // Thêm interceptor
    ),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:8080'], // Đảm bảo domain đúng cấu trúc
          disallowedRoutes: []
        },
      })
    )
  ]
};
