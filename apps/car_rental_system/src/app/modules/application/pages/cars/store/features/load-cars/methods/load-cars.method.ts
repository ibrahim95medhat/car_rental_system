import { patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, tap, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createLoadCustomerCarsHandlers } from '../handlers/load-cars.handlers';

export function createLoadCustomerCarsMethod(store: any) {
  return rxMethod<void>(
    pipe(
      tap(() => patchState(store, { carsLoading: true })),
      switchMap(() =>
        store.carsService
          .getAll(store.filters())
          .pipe(
            takeUntilDestroyed(store.destroyRef),
            tapResponse(createLoadCustomerCarsHandlers(store)),
          ),
      ),
    ),
  );
}
