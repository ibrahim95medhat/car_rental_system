import { DestroyRef, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { initialUsersState } from './state/users.store.state';
import {
  AdminUsersService,
  UserFilters,
} from '../../../services/admin-users.service';
import { createLoadUsersMethod } from './features/load-users/methods/load-users.method';

export const UsersStore = signalStore(
  withState(initialUsersState),

  withProps(() => ({
    usersService: inject(AdminUsersService),
    destroyRef: inject(DestroyRef),
  })),

  withMethods((store) => ({
    loadUsers: createLoadUsersMethod(store),
  })),

  withMethods((store) => ({
    setFilters(filters: UserFilters): void {
      patchState(store, {
        filters: { ...store.filters(), ...filters, page: 1 },
      });
      store.loadUsers();
    },

    setPerPage(per_page: number): void {
      patchState(store, { filters: { ...store.filters(), per_page, page: 1 } });
      store.loadUsers();
    },

    setPage(page: number): void {
      patchState(store, { filters: { ...store.filters(), page } });
      store.loadUsers();
    },

    setSearch(search: string): void {
      patchState(store, { filters: { ...store.filters(), search, page: 1 } });
      store.loadUsers();
    },
  })),

  withHooks((store) => ({
    onInit: () => {
      store.loadUsers();
    },
  })),
);
