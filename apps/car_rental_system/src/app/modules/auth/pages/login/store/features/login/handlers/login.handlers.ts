import { patchState } from '@ngrx/signals';
import { AuthResponse } from '../../../../../../../../core/models';

export function createLoginHandlers(store: any) {
  return {
    next: ({ user, token }: AuthResponse) => {
      patchState(store, { isLoading: false, serverError: null });
      store.tokenService.setToken(token);
      store.tokenService.setRole(user.role);
      store.authState.setUser(user);
      store.router.navigate(
        user.role === 'admin' ? ['/admin/users'] : ['/cars'],
      );
    },
    error: (err: any) => {
      patchState(store, {
        isLoading: false,
        serverError:
          err?.error?.message ?? 'Invalid credentials. Please try again.',
      });
    },
    finalize: () => patchState(store, { isLoading: false }),
  };
}
