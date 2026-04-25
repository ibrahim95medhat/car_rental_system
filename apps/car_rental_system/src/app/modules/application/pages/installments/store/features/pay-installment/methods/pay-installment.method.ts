import { patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, tap, exhaustMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { payInstallmentHandlers } from '../handlers/pay-installment.handlers';
import { ToastService } from '@ui-lib';
import { TranslocoService } from '@jsverse/transloco';

export function payInstallmentMethod(
  store: any,
  toast: ToastService,
  transloco: TranslocoService,
) {
  return rxMethod<number>(
    pipe(
      tap((id) => patchState(store, { payingId: id })),
      exhaustMap((id) =>
        store.installmentsService
          .pay(id)
          .pipe(
            takeUntilDestroyed(store.destroyRef),
            tapResponse(payInstallmentHandlers(store, toast, transloco)),
          ),
      ),
    ),
  );
}
