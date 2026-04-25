import { patchState } from '@ngrx/signals';
import { ToastService } from '@ui-lib';
import { TranslocoService } from '@jsverse/transloco';
import { Car } from '../../../../../../../../core/models';

export function updateCarHandlers(
  store: any,
  toast: ToastService,
  transloco: TranslocoService,
) {
  return {
    next: (car: Car) => {
      patchState(store, {
        cars: store.cars().map((c: Car) => (c.id === car.id ? car : c)),
        modalOpen: false,
        selectedCar: null,
      });
      toast.success(
        transloco.translate('TOAST_CAR_UPDATED'),
        transloco.translate('TOAST_CAR_UPDATED_MSG', {
          name: car.name,
        }),
      );
    },
    error: () => {
      patchState(store, { submitting: false });
      toast.error(
        transloco.translate('TOAST_CAR_UPDATE_FAIL'),
        transloco.translate('TOAST_CAR_UPDATE_FAIL_MSG'),
      );
    },
    finalize: () => patchState(store, { submitting: false }),
  };
}
