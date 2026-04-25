import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../services/token/token.service';

/** Blocks access if user is NOT a customer */
export const customerGuard: CanActivateFn = () => {
  const token = inject(TokenService);
  const router = inject(Router);

  if (token.isLoggedIn() && token.isCustomer()) return true;

  if (token.isLoggedIn() && token.isAdmin())
    return router.createUrlTree(['/admin/users']);

  return router.createUrlTree(['/login']);
};
