import { computed, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { TranslocoService } from '@jsverse/transloco';
import { initialDashboardLayoutState } from './state/dashboard-layout.store.state';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { TokenService } from '../../../core/services/token/token.service';
import { AuthStateService } from '../../../core/services/auth-state/auth-state.service';
import { createLogoutMethod } from './features/logout/methods/logout.method';
import { NavbarUser } from '@ui-lib';

export const DashboardLayoutStore = signalStore(
  withState(initialDashboardLayoutState),

  withProps(() => ({
    authService: inject(AuthService),
    tokenService: inject(TokenService),
    authState: inject(AuthStateService),
    router: inject(Router),
    destroyRef: inject(DestroyRef),
    transloco: inject(TranslocoService),
    document: inject(DOCUMENT),
  })),

  withComputed((store) => ({
    navbarUser: computed((): NavbarUser | null => {
      const u = store.authState.user();
      return u ? { name: u.name, subtitle: u.role } : null;
    }),
  })),

  withMethods((store) => ({
    logout: createLogoutMethod(store),
  })),

  withMethods((store) => ({
    handleAction(action: string): void {
      if (action === 'logout') {
        const role = store.authState.isAdmin() ? 'admin' : 'customer';
        store.logout(role);
      }
    },

    setSidebarCollapsed(collapsed: boolean): void {
      patchState(store, { isSidebarCollapsed: collapsed });
    },

    toggleLang(): void {
      const current = store.transloco.getActiveLang();
      const next = current === 'en' ? 'ar' : 'en';
      store.transloco.setActiveLang(next);
      store.document.documentElement.setAttribute(
        'dir',
        next === 'ar' ? 'rtl' : 'ltr',
      );
      store.document.documentElement.setAttribute('lang', next);
    },
  })),
);
