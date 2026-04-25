import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { TokenService } from '../../services/token/token.service';
import { AuthStateService } from '../../services/auth-state/auth-state.service';
import { ToastService } from '@ui-lib';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const authState = inject(AuthStateService);
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error) => {
      switch (error.status) {
        case 401:
          tokenService.clear();
          authState.clearUser();
          router.navigate(['/login']);
          break;

        case 403:
          toast.error(
            'Access Denied',
            'You do not have permission to perform this action.',
          );
          break;

        case 404:
          router.navigate(['/404']);
          break;

        case 422:
          // Validation errors — let the component/store handle them
          break;

        case 500:
          toast.error(
            'Server Error',
            'Something went wrong. Please try again later.',
          );
          break;

        default:
          toast.error(
            'Unexpected Error',
            `An unexpected error occurred (${error.status}).`,
          );
          break;
      }

      return throwError(() => error);
    }),
  );
};
