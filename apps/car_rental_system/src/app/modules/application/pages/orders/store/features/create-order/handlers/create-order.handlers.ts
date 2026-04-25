import { patchState } from '@ngrx/signals';
import { ToastService } from '@ui-lib';
import { TranslocoService } from '@jsverse/transloco';
import { HttpErrorResponse } from '@angular/common/http';
import { Order } from '../../../../../../../../core/models';

export function createOrderHandlers(
  store: any,
  toast: ToastService,
  transloco: TranslocoService,
) {
  return {
    next: (order: Order) => {
      patchState(store, {
        orders: [order, ...store.orders()],
      });
      store.modalSvc.close();
      toast.success(
        transloco.translate('TOAST_ORDER_PLACED'),
        transloco.translate('TOAST_ORDER_PLACED_MSG'),
      );
    },
    error: (err: HttpErrorResponse) => {
      patchState(store, { submitting: false });
      const apiErrors = err?.error?.errors as
        | Record<string, string[]>
        | undefined;
      if (apiErrors) {
        // Set inline server errors on matching form controls
        let anyMatched = false;
        Object.entries(apiErrors).forEach(([field, messages]) => {
          const control = store.form.get(field);
          if (control) {
            control.markAsTouched();
            control.setErrors({ serverError: messages[0] });
            anyMatched = true;
          }
        });
        if (anyMatched) return; // inline errors shown, no toast needed
      }
      toast.error(
        transloco.translate('TOAST_ORDER_FAIL'),
        transloco.translate('TOAST_ORDER_FAIL_MSG'),
      );
    },
    finalize: () => patchState(store, { submitting: false }),
  };
}
