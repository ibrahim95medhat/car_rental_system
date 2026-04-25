import { DestroyRef, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { initialOrdersState } from './state/orders.store.state';
import { AdminOrdersService } from '../../../services/admin-orders.service';
import { OrderFilters } from '../../../../../core/models';
import { ToastService } from '@ui-lib';
import { TranslocoService } from '@jsverse/transloco';
import { createLoadOrdersMethod } from './features/load-orders/methods/load-orders.method';
import { updatePaymentStatusMethod } from './features/update-payment-status/methods/update-payment-status.method';

export const AdminOrdersStore = signalStore(
  withState(initialOrdersState),

  withProps(() => ({
    ordersService: inject(AdminOrdersService),
    destroyRef: inject(DestroyRef),
    toast: inject(ToastService),
    transloco: inject(TranslocoService),
  })),

  withMethods((store) => ({
    loadOrders: createLoadOrdersMethod(store),
    updatePaymentStatus: updatePaymentStatusMethod(store),
  })),

  withMethods((store) => ({
    setFilters(filters: OrderFilters): void {
      patchState(store, {
        filters: { ...store.filters(), ...filters, page: 1 },
      });
      store.loadOrders();
    },

    setPerPage(per_page: number): void {
      patchState(store, { filters: { ...store.filters(), per_page, page: 1 } });
      store.loadOrders();
    },

    setPage(page: number): void {
      patchState(store, { filters: { ...store.filters(), page } });
      store.loadOrders();
    },

    setSearch(search: string): void {
      patchState(store, { filters: { ...store.filters(), search, page: 1 } });
      store.loadOrders();
    },
  })),

  withHooks((store) => ({
    onInit: () => {
      store.loadOrders();
    },
  })),
);
