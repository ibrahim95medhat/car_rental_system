import { patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, tap, exhaustMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateOrderPayload } from '../../../../../../../../core/models';
import { createOrderHandlers } from '../handlers/create-order.handlers';

export function createOrderMethod(store: any) {
  return rxMethod<CreateOrderPayload>(
    pipe(
      tap(() => patchState(store, { submitting: true })),
      exhaustMap((payload) =>
        store.ordersService
          .create(payload)
          .pipe(
            takeUntilDestroyed(store.destroyRef),
            tapResponse(createOrderHandlers(store, store.toast, store.transloco)),
          ),
      ),
    ),
  );
}
