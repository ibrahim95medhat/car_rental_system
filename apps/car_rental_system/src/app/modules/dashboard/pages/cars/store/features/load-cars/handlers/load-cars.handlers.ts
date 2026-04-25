import { patchState } from '@ngrx/signals';
import { PaginatedResponse } from '@ui-lib';
import { Car } from '../../../../../../../../core/models';

export function createLoadCarsHandlers(store: any) {
  return {
    next: (response: PaginatedResponse<Car>) => {
      const { data, ...meta } = response;
      patchState(store, { cars: data, carsMeta: meta });
    },
    error: () => {
      patchState(store, { carsLoading: false });
    },
    finalize: () => patchState(store, { carsLoading: false }),
  };
}
