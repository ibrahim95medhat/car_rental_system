import { Route } from '@angular/router';

export const applicationRoutes: Route[] = [
  {
    path: 'cars',
    loadComponent: () =>
      import('./pages/cars/cars').then((m) => m.CustomerCars),
  },
  {
    path: 'cars/:id',
    loadComponent: () =>
      import('./pages/cars/car-detail/car-detail').then(
        (m) => m.CustomerCarDetail,
      ),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./pages/orders/orders').then((m) => m.CustomerOrders),
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./pages/orders/order-detail/order-detail').then(
        (m) => m.CustomerOrderDetail,
      ),
  },
  {
    path: 'installments',
    loadComponent: () =>
      import('./pages/installments/installments').then(
        (m) => m.CustomerInstallments,
      ),
  },
];
