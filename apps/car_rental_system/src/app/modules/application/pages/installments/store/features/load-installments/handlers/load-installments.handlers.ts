import { patchState } from '@ngrx/signals';
import { PaginatedResponse } from '@ui-lib';
import { Installment } from '../../../../../../../../core/models';

export function createLoadInstallmentsHandlers(store: any) {
  return {
    next: (response: PaginatedResponse<Installment>) => {
      const { data, ...meta } = response;
      patchState(store, { installments: data, installmentsMeta: meta });
    },
    error: () => {
      patchState(store, { installmentsLoading: false });
    },
    finalize: () => patchState(store, { installmentsLoading: false }),
  };
}
