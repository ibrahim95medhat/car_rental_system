import { DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import {
  patchState,
  signalStore,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { initialRegisterState } from './state/register.store.state';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../../../core/services/token/token.service';
import { AuthStateService } from '../../../../../core/services/auth-state/auth-state.service';
import { RegisterPayload } from '../../../../../core/models';
import { createRegisterMethod } from './features/register/methods/register.method';
import { setFormErrors } from '../../../../../core/utils/set-form-errors.util';

export const RegisterStore = signalStore(
  withState(initialRegisterState),

  withProps(() => ({
    authService: inject(AuthService),
    tokenService: inject(TokenService),
    authState: inject(AuthStateService),
    router: inject(Router),
    destroyRef: inject(DestroyRef),
  })),

  withMethods((store) => ({
    register: createRegisterMethod(store),

    selectRole(role: 'admin' | 'customer'): void {
      patchState(store, { selectedRole: role });
    },

    setCountryFromISO(iso: string): void {
      if (!iso) return;
      try {
        const name = new Intl.DisplayNames(['en'], { type: 'region' }).of(
          iso.toUpperCase(),
        );
        patchState(store, { country: name ?? iso });
      } catch {
        // ignore invalid ISO codes emitted by the phone library
      }
    },

    applyServerErrors(form: FormGroup): void {
      const errors = store.serverErrors();
      if (errors) setFormErrors(form, errors);
    },
  })),

  withMethods((store) => ({
    submit(payload: RegisterPayload): void {
      store.register({ payload, role: store.selectedRole() });
    },
  })),
);
