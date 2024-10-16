import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { routesAdmin } from './components/admin/admin.routes';
import { routesNhanvien } from './components/admin/nhanvien/nhanvien.routes';

const combinedRoutes = [...routes, ...routesAdmin,...routesNhanvien];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(combinedRoutes), provideClientHydration()]
};
