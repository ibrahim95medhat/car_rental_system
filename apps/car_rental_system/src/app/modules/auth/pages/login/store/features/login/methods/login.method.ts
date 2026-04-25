import { patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, tap, exhaustMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoginPayload } from '../../../../../../../../core/models';
import { createLoginHandlers } from '../handlers/login.handlers';

export function createLoginMethod(store: any) {
  return rxMethod<{ payload: LoginPayload; role: 'admin' | 'customer' }>(
    pipe(
      tap(() => patchState(store, { isLoading: true, serverError: null })),
      exhaustMap(({ payload, role }) =>
        store.authService
          .login(payload, role)
          .pipe(
            takeUntilDestroyed(store.destroyRef),
            tapResponse(createLoginHandlers(store)),
          ),
      ),
    ),
  );
}
