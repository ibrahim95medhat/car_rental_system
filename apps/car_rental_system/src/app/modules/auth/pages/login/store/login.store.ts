import { DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  patchState,
  signalStore,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { initialLoginState } from './state/login.store.state';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../../../core/services/token/token.service';
import { AuthStateService } from '../../../../../core/services/auth-state/auth-state.service';
import { LoginPayload } from '../../../../../core/models';
import { createLoginMethod } from './features/login/methods/login.method';

export const LoginStore = signalStore(
  withState(initialLoginState),

  withProps(() => ({
    authService: inject(AuthService),
    tokenService: inject(TokenService),
    authState: inject(AuthStateService),
    router: inject(Router),
    destroyRef: inject(DestroyRef),
  })),

  withMethods((store) => ({
    login: createLoginMethod(store),

    selectRole(role: 'admin' | 'customer'): void {
      patchState(store, { selectedRole: role });
    },

    clearServerError(): void {
      patchState(store, { serverError: null });
    },

    submit(payload: LoginPayload): void {
      this.login({ payload, role: store.selectedRole() });
    },
  })),
);
