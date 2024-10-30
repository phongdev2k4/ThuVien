

import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authKeyInterceptor } from './interceptors/auth-key.interceptor';

import { JwtModule } from '@auth0/angular-jwt';



const combinedRoutes = [...routes];

export function tokenGetter() {
  return localStorage.getItem('auth-key');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['http://localhost:8080/api'], // Replace with your actual API domain
          disallowedRoutes: [], // Adjust based on your needs
        },
      })
    ),
    provideHttpClient(withInterceptors([authKeyInterceptor]),withFetch()),
  ],
};