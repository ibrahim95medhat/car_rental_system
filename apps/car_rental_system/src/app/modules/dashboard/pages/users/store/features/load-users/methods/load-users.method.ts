import { patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, tap, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createLoadUsersHandlers } from '../handlers/load-users.handlers';

export function createLoadUsersMethod(store: any) {
  return rxMethod<void>(
    pipe(
      tap(() => patchState(store, { usersLoading: true })),
      switchMap(() =>
        store.usersService
          .getAll(store.filters())
          .pipe(
            takeUntilDestroyed(store.destroyRef),
            tapResponse(createLoadUsersHandlers(store)),
          ),
      ),
    ),
  );
}
