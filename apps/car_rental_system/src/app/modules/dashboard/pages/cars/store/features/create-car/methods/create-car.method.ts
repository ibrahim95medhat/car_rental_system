import { patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, tap, exhaustMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CarPayload } from '../../../../../../../../core/models';
import { createCarHandlers } from '../handlers/create-car.handlers';

export function createCarMethod(store: any, loadCars: () => void) {
  return rxMethod<CarPayload>(
    pipe(
      tap(() => patchState(store, { submitting: true })),
      exhaustMap((payload) =>
        store.carsService.create(payload).pipe(
          takeUntilDestroyed(store.destroyRef),
          tapResponse(createCarHandlers(store, store.toast, store.transloco)),
          tap(() => loadCars()),
        ),
      ),
    ),
  );
}
