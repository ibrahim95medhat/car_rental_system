import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users').then((m) => m.Users),
  },
  {
    path: 'cars',
    loadComponent: () => import('./pages/cars/cars').then((m) => m.AdminCars),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./pages/orders/orders').then((m) => m.AdminOrders),
  },
];
