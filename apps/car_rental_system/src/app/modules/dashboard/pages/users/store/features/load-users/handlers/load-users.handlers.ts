import { patchState } from '@ngrx/signals';
import { PaginatedResponse } from '@ui-lib';
import { User } from '../../../../../../../../core/models';

export function createLoadUsersHandlers(store: any) {
  return {
    next: (response: PaginatedResponse<User>) => {
      const { data, ...meta } = response;
      patchState(store, {
        users: data,
        usersMeta: meta,
      });
    },
    error: () => {
      patchState(store, { usersLoading: false });
    },
    finalize: () => patchState(store, { usersLoading: false }),
  };
}
