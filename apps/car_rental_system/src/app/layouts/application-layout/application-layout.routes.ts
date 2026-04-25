import { Route } from '@angular/router';
import { ApplicationLayout } from './application-layout/application-layout';

export const applicationLayoutRoutes: Route[] = [
  {
    path: '',
    component: ApplicationLayout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cars',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/application/application.routes').then(
            (m) => m.applicationRoutes,
          ),
      },
    ],
  },
];
