import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../services/token/token.service';

/** Blocks already-logged-in users from accessing login/register */
export const unauthGuard: CanActivateFn = () => {
  const token = inject(TokenService);
  const router = inject(Router);

  if (!token.isLoggedIn()) return true;

  return token.isAdmin()
    ? router.createUrlTree(['/admin/users'])
    : router.createUrlTree(['/cars']);
};
