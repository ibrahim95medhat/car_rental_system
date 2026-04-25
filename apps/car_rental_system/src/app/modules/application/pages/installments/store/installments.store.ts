import { DestroyRef, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { initialInstallmentsState } from './state/installments.store.state';
import { CustomerInstallmentsService } from '../../../services/customer-installments.service';
import { createLoadInstallmentsMethod } from './features/load-installments/methods/load-installments.method';
import { payInstallmentMethod } from './features/pay-installment/methods/pay-installment.method';
import { ToastService } from '@ui-lib';
import { TranslocoService } from '@jsverse/transloco';

export const InstallmentsStore = signalStore(
  withState(initialInstallmentsState),

  withProps(() => ({
    installmentsService: inject(CustomerInstallmentsService),
    destroyRef: inject(DestroyRef),
    toast: inject(ToastService),
    transloco: inject(TranslocoService),
  })),

  withMethods((store) => ({
    loadInstallments: createLoadInstallmentsMethod(store),
    payInstallment: payInstallmentMethod(store, store.toast, store.transloco),
  })),

  withMethods((store) => ({
    setPage(page: number): void {
      patchState(store, { page });
      store.loadInstallments();
    },

    setSearch(search: string): void {
      patchState(store, { search, page: 1 });
      store.loadInstallments();
    },
  })),

  withHooks((store) => ({
    onInit: () => {
      store.loadInstallments();
    },
  })),
);
