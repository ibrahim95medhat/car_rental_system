import { DestroyRef, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { initialCustomerCarsState } from './state/cars.store.state';
import { CustomerCarsService } from '../../../services/customer-cars.service';
import { CarFilters } from '../../../../../core/models';
import { createLoadCustomerCarsMethod } from './features/load-cars/methods/load-cars.method';

export const CustomerCarsStore = signalStore(
  withState(initialCustomerCarsState),

  withProps(() => ({
    carsService: inject(CustomerCarsService),
    destroyRef: inject(DestroyRef),
  })),

  withMethods((store) => ({
    loadCars: createLoadCustomerCarsMethod(store),
  })),

  withMethods((store) => ({
    setFilters(filters: CarFilters): void {
      patchState(store, {
        filters: { ...store.filters(), ...filters, page: 1 },
      });
      store.loadCars();
    },

    setPage(page: number): void {
      patchState(store, { filters: { ...store.filters(), page } });
      store.loadCars();
    },

    setPerPage(per_page: number): void {
      patchState(store, { filters: { ...store.filters(), per_page, page: 1 } });
      store.loadCars();
    },

    setSearch(search: string): void {
      patchState(store, { filters: { ...store.filters(), search, page: 1 } });
      store.loadCars();
    },
  })),

  withHooks((store) => ({
    onInit: () => {
      store.loadCars();
    },
  })),
);
