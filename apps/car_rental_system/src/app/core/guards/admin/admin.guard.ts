import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../services/token/token.service';

/** Blocks access if user is NOT an admin */
export const adminGuard: CanActivateFn = () => {
  const token = inject(TokenService);
  const router = inject(Router);

  if (token.isLoggedIn() && token.isAdmin()) return true;

  if (token.isLoggedIn()) return router.createUrlTree(['/cars']);

  return router.createUrlTree(['/login']);
};
