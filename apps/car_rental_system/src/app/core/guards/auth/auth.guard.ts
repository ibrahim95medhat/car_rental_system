import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { TokenService } from '../../services/token/token.service';

/** Blocks access if user is NOT logged in → redirects to /login */
export const authGuard: CanMatchFn = () => {
  const token = inject(TokenService);
  const router = inject(Router);

  if (token.isLoggedIn()) return true;

  return router.createUrlTree(['/login']);
};
