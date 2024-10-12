import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { routesAdmin } from './components/admin/admin.routes';
import { provideHttpClient } from '@angular/common/http';

const combinedRoutes = [...routes, ...routesAdmin];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(combinedRoutes), provideClientHydration(),provideHttpClient()]
};
