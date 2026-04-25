import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, tap, exhaustMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { deleteCarHandlers } from '../handlers/delete-car.handlers';

export function deleteCarMethod(store: any, loadCars: () => void) {
  return rxMethod<number>(
    pipe(
      exhaustMap((id) =>
        store.carsService.delete(id).pipe(
          takeUntilDestroyed(store.destroyRef),
          tapResponse(
            deleteCarHandlers(store, id, store.toast, store.transloco),
          ),
          tap(() => loadCars()),
        ),
      ),
    ),
  );
}
