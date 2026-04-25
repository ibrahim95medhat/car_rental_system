import { patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, tap, exhaustMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createLogoutHandlers } from '../handlers/logout.handlers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createLogoutMethod(store: any) {
  return rxMethod<'admin' | 'customer'>(
    pipe(
      tap(() => patchState(store, { isLoggingOut: true })),
      exhaustMap((role) =>
        store.authService
          .logout(role)
          .pipe(
            takeUntilDestroyed(store.destroyRef),
            tapResponse(createLogoutHandlers(store)),
          ),
      ),
    ),
  );
}
