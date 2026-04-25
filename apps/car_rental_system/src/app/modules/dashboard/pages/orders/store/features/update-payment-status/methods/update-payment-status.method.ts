import { patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, tap, exhaustMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UpdateOrderPayload } from '../../../../../../../../core/models';
import { updatePaymentStatusHandlers } from '../handlers/update-payment-status.handlers';

export function updatePaymentStatusMethod(store: any) {
  return rxMethod<{ id: number; payload: UpdateOrderPayload }>(
    pipe(
      tap(({ id, payload }) =>
        patchState(store, {
          updatingId: id,
          updatingStatus: payload.payment_status,
        }),
      ),
      exhaustMap(({ id, payload }) =>
        store.ordersService
          .updatePaymentStatus(id, payload)
          .pipe(
            takeUntilDestroyed(store.destroyRef),
            tapResponse(
              updatePaymentStatusHandlers(store, store.toast, store.transloco),
            ),
          ),
      ),
    ),
  );
}
