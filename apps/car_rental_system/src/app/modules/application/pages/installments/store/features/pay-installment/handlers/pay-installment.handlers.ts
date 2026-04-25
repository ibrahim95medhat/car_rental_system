import { patchState } from '@ngrx/signals';
import { ToastService } from '@ui-lib';
import { TranslocoService } from '@jsverse/transloco';
import { Installment } from '../../../../../../../../core/models';

export function payInstallmentHandlers(
  store: any,
  toast: ToastService,
  transloco: TranslocoService,
) {
  return {
    next: (response: { data: Installment }) => {
      patchState(store, {
        installments: store
          .installments()
          .map((i: Installment) =>
            i.id === response.data.id ? response.data : i,
          ),
      });
      toast.success(
        transloco.translate('TOAST_INSTALLMENT_PAID'),
        transloco.translate('TOAST_INSTALLMENT_PAID_MSG', {
          id: response.data.id,
        }),
      );
    },
    error: () => {
      patchState(store, { payingId: null });
      toast.error(
        transloco.translate('TOAST_INSTALLMENT_FAIL'),
        transloco.translate('TOAST_INSTALLMENT_FAIL_MSG'),
      );
    },
    finalize: () => patchState(store, { payingId: null }),
  };
}
