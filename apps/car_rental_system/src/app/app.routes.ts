import { Route } from '@angular/router';
import { unauthGuard } from './core/guards/unauth/unauth.guard';
import { adminGuard } from './core/guards/admin/admin.guard';
import { customerGuard } from './core/guards/customer/customer.guard';

export const appRoutes: Route[] = [
  // Auth (guest only)
  {
    path: '',
    canActivate: [unauthGuard],
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((m) => m.authRoutes),
  },

  // Admin dashboard
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./layouts/dashboard-layout/dashboard-layout.routes').then(
        (m) => m.dashboardLayoutRoutes,
      ),
  },

  // Customer application
  {
    path: '',
    canActivate: [customerGuard],
    loadChildren: () =>
      import('./layouts/application-layout/application-layout.routes').then(
        (m) => m.applicationLayoutRoutes,
      ),
  },

  // 404
  {
    path: '404',
    loadComponent: () =>
      import('./modules/not-found/not-found').then((m) => m.NotFound),
  },

  // Catch-all
  { path: '**', redirectTo: '404' },
];
