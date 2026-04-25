import { patchState } from '@ngrx/signals';
import { ToastService } from '@ui-lib';
import { TranslocoService } from '@jsverse/transloco';
import { Order } from '../../../../../../../../core/models';

export function updatePaymentStatusHandlers(
  store: any,
  toast: ToastService,
  transloco: TranslocoService,
) {
  return {
    next: (order: Order) => {
      patchState(store, {
        orders: store
          .orders()
          .map((o: Order) => (o.id === order.id ? order : o)),
      });
      toast.success(
        transloco.translate('TOAST_PAYMENT_UPDATED'),
        transloco.translate('TOAST_PAYMENT_UPDATED_MSG', {
          id: order.id,
          status: order.payment_status,
        }),
      );
    },
    error: () => {
      patchState(store, { updatingId: null, updatingStatus: null });
      toast.error(
        transloco.translate('TOAST_PAYMENT_UPDATE_FAIL'),
        transloco.translate('TOAST_PAYMENT_UPDATE_FAIL_MSG'),
      );
    },
    finalize: () =>
      patchState(store, { updatingId: null, updatingStatus: null }),
  };
}
