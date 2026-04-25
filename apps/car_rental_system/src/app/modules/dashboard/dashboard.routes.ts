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
    path: 'users/:id',
    loadComponent: () =>
      import('./pages/users/user-detail/user-detail').then((m) => m.UserDetail),
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
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./pages/orders/order-detail/order-detail').then((m) => m.OrderDetail),
  },
];
