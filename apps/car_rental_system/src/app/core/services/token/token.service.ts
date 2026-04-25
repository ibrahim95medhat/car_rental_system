import { Injectable } from '@angular/core';

const TOKEN_KEY = 'car_rental_token';
const ROLE_KEY = 'car_rental_role';

@Injectable({ providedIn: 'root' })
export class TokenService {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getRole(): string | null {
    return localStorage.getItem(ROLE_KEY);
  }

  setRole(role: string): void {
    localStorage.setItem(ROLE_KEY, role);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isCustomer(): boolean {
    return this.getRole() === 'customer';
  }

  clear(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
  }
}
