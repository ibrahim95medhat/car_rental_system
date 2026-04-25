import { patchState } from '@ngrx/signals';
import { AuthResponse } from '../../../../../../../../core/models';

export function createRegisterHandlers(store: any) {
  return {
    next: ({ user, token }: AuthResponse) => {
      patchState(store, { isLoading: false });
      store.tokenService.setToken(token);
      store.tokenService.setRole(user.role);
      store.authState.setUser(user);
      store.router.navigate(['/cars']);
    },
    error: (err: any) => {
      patchState(store, {
        isLoading: false,
        serverErrors: err?.status === 422 ? (err?.error?.errors ?? null) : null,
      });
    },
    finalize: () => patchState(store, { isLoading: false }),
  };
}
