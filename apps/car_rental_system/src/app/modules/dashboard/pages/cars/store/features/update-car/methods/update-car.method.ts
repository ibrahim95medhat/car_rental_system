import { patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, tap, exhaustMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CarPayload } from '../../../../../../../../core/models';
import { updateCarHandlers } from '../handlers/update-car.handlers';

export function updateCarMethod(store: any, loadCars: () => void) {
  return rxMethod<{ id: number; payload: CarPayload }>(
    pipe(
      tap(() => patchState(store, { submitting: true })),
      exhaustMap(({ id, payload }) =>
        store.carsService.update(id, payload).pipe(
          takeUntilDestroyed(store.destroyRef),
          tapResponse(updateCarHandlers(store, store.toast, store.transloco)),
          tap(() => loadCars()),
        ),
      ),
    ),
  );
}
