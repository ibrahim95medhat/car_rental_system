import { patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, tap, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createLoadOrdersHandlers } from '../handlers/load-orders.handlers';

export function createLoadOrdersMethod(store: any) {
  return rxMethod<void>(
    pipe(
      tap(() => patchState(store, { ordersLoading: true })),
      switchMap(() =>
        store.ordersService
          .getAll(store.filters())
          .pipe(
            takeUntilDestroyed(store.destroyRef),
            tapResponse(createLoadOrdersHandlers(store)),
          ),
      ),
    ),
  );
}
