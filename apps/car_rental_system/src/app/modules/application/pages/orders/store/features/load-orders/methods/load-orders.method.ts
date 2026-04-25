import { patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, tap, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createLoadCustomerOrdersHandlers } from '../handlers/load-orders.handlers';

export function createLoadCustomerOrdersMethod(store: any) {
  return rxMethod<void>(
    pipe(
      tap(() => patchState(store, { ordersLoading: true })),
      switchMap(() =>
        store.ordersService
          .getAll({ page: store.page(), per_page: store.perPage(), search: store.search() || undefined })
          .pipe(
            takeUntilDestroyed(store.destroyRef),
            tapResponse(createLoadCustomerOrdersHandlers(store)),
          ),
      ),
    ),
  );
}
