import { Route } from '@angular/router';
import { DashboardLayout } from './dashboard-layout/dashboard-layout';

export const dashboardLayoutRoutes: Route[] = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/dashboard/dashboard.routes').then(
            (m) => m.dashboardRoutes,
          ),
      },
    ],
  },
];
