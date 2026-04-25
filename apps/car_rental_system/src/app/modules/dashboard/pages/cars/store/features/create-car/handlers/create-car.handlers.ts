import { patchState } from '@ngrx/signals';
import { ToastService } from '@ui-lib';
import { TranslocoService } from '@jsverse/transloco';
import { Car } from '../../../../../../../../core/models';

export function createCarHandlers(
  store: any,
  toast: ToastService,
  transloco: TranslocoService,
) {
  return {
    next: (car: Car) => {
      patchState(store, {
        cars: [car, ...store.cars()],
        modalOpen: false,
      });
      toast.success(
        transloco.translate('TOAST_CAR_ADDED'),
        transloco.translate('TOAST_CAR_ADDED_MSG', {
          name: car.name,
        }),
      );
    },
    error: () => {
      patchState(store, { submitting: false });
      toast.error(
        transloco.translate('TOAST_CAR_ADD_FAIL'),
        transloco.translate('TOAST_CAR_ADD_FAIL_MSG'),
      );
    },
    finalize: () => patchState(store, { submitting: false }),
  };
}
