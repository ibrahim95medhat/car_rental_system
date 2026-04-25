import { DestroyRef, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { initialCarsState } from './state/cars.store.state';
import { AdminCarsService } from '../../../services/admin-cars.service';
import { Car, CarFilters, CarPayload } from '../../../../../core/models';
import { ModalMode } from './models/modal.model';
import { createLoadCarsMethod } from './features/load-cars/methods/load-cars.method';
import { createCarMethod } from './features/create-car/methods/create-car.method';
import { updateCarMethod } from './features/update-car/methods/update-car.method';
import { deleteCarMethod } from './features/delete-car/methods/delete-car.method';
import { ToastService } from '@ui-lib';
import { TranslocoService } from '@jsverse/transloco';

export const CarsStore = signalStore(
  withState(initialCarsState),

  withProps(() => ({
    carsService: inject(AdminCarsService),
    destroyRef: inject(DestroyRef),
    toast: inject(ToastService),
    transloco: inject(TranslocoService),
  })),

  withMethods((store) => {
    const loadCars = createLoadCarsMethod(store);
    return {
      loadCars,
      createCar: createCarMethod(store, loadCars),
      updateCar: updateCarMethod(store, loadCars),
      deleteCar: deleteCarMethod(store, loadCars),

      setFilters(filters: CarFilters): void {
        patchState(store, {
          filters: { ...store.filters(), ...filters, page: 1 },
        });
        loadCars();
      },

      setPage(page: number): void {
        patchState(store, { filters: { ...store.filters(), page } });
        loadCars();
      },

      setPerPage(per_page: number): void {
        patchState(store, {
          filters: { ...store.filters(), per_page, page: 1 },
        });
        loadCars();
      },

      setSearch(search: string): void {
        patchState(store, {
          filters: { ...store.filters(), search, page: 1 },
        });
        loadCars();
      },

      openCreateModal(): void {
        patchState(store, {
          modalOpen: true,
          modalMode: 'create' as ModalMode,
          selectedCar: null,
        });
      },

      openEditModal(car: Car): void {
        patchState(store, {
          modalOpen: true,
          modalMode: 'edit' as ModalMode,
          selectedCar: car,
        });
      },

      closeModal(): void {
        patchState(store, { modalOpen: false, selectedCar: null });
      },

      openDeleteConfirm(id: number): void {
        patchState(store, { confirmDeleteId: id });
      },

      cancelDelete(): void {
        patchState(store, { confirmDeleteId: null });
      },

      confirmDelete(): void {
        const id = store.confirmDeleteId();
        if (id === null) return;
        patchState(store, { confirmDeleteId: null });
        this.deleteCar(id);
      },

      submitForm(payload: CarPayload): void {
        if (store.modalMode() === 'create') {
          this.createCar(payload);
        } else {
          const id = store.selectedCar()?.id ?? 0;
          this.updateCar({ id, payload });
        }
      },
    };
  }),

  withHooks((store) => ({
    onInit: () => {
      store.loadCars();
    },
  })),
);
