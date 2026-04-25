import { patchState } from '@ngrx/signals';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createLogoutHandlers(store: any) {
  return {
    next: () => {
      patchState(store, { isLoggingOut: false });
      store.tokenService.clear();
      store.authState.clearUser();
      store.router.navigate(['/login']);
    },
    error: () => {
      // Clear local state even if server call fails
      patchState(store, { isLoggingOut: false });
      store.tokenService.clear();
      store.authState.clearUser();
      store.router.navigate(['/login']);
    },
  };
}
