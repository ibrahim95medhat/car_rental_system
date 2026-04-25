import { patchState } from '@ngrx/signals';
import { ToastService } from '@ui-lib';
import { TranslocoService } from '@jsverse/transloco';
import { Car } from '../../../../../../../../core/models';

export function deleteCarHandlers(
  store: any,
  id: number,
  toast: ToastService,
  transloco: TranslocoService,
) {
  return {
    next: () => {
      patchState(store, {
        cars: store.cars().filter((c: Car) => c.id !== id),
      });
      toast.success(
        transloco.translate('TOAST_CAR_DELETED'),
        transloco.translate('TOAST_CAR_DELETED_MSG'),
      );
    },
    error: () => {
      toast.error(
        transloco.translate('TOAST_CAR_DELETE_FAIL'),
        transloco.translate('TOAST_CAR_DELETE_FAIL_MSG'),
      );
    },
  };
}
