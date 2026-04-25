import { patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, tap, exhaustMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RegisterPayload } from '../../../../../../../../core/models';
import { createRegisterHandlers } from '../handlers/register.handlers';

export function createRegisterMethod(store: any) {
  return rxMethod<{ payload: RegisterPayload; role: 'admin' | 'customer' }>(
    pipe(
      tap(() => patchState(store, { isLoading: true, serverErrors: null })),
      exhaustMap(({ payload, role }) =>
        store.authService
          .register(payload, role)
          .pipe(
            takeUntilDestroyed(store.destroyRef),
            tapResponse(createRegisterHandlers(store)),
          ),
      ),
    ),
  );
}
