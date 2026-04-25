import { computed, Injectable, signal } from '@angular/core';
import { User } from '../../models';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  readonly user = signal<User | null>(null);
  readonly isLoggedIn = computed(() => !!this.user());
  readonly isAdmin = computed(() => this.user()?.role === 'admin');
  readonly isCustomer = computed(() => this.user()?.role === 'customer');

  setUser(user: User): void {
    this.user.set(user);
  }

  clearUser(): void {
    this.user.set(null);
  }
}
