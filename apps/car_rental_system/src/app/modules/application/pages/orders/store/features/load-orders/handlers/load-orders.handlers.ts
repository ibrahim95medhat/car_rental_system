import { patchState } from '@ngrx/signals';
import { PaginatedResponse } from '@ui-lib';
import { Order } from '../../../../../../../../core/models';

export function createLoadCustomerOrdersHandlers(store: any) {
  return {
    next: (response: PaginatedResponse<Order>) => {
      const { data, ...meta } = response;
      patchState(store, { orders: data, ordersMeta: meta });
    },
    error: () => {
      patchState(store, { ordersLoading: false });
    },
    finalize: () => patchState(store, { ordersLoading: false }),
  };
}
