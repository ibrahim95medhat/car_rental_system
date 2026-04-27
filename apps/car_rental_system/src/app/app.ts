import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LibToast, LibOffcanvas, OffcanvasService } from '@ui-lib';
import { TokenService } from './core/services/token/token.service';
import { AuthStateService } from './core/services/auth-state/auth-state.service';
import { AuthService } from './modules/auth/services/auth.service';
import { catchError, of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LibToast,
    LibOffcanvas,
    ReactiveFormsModule,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly offcanvasService = inject(OffcanvasService);

  constructor() {
    const token = inject(TokenService);
    const authState = inject(AuthStateService);
    const authService = inject(AuthService);

    if (token.isLoggedIn()) {
      const role = token.isAdmin() ? 'admin' : 'customer';
      authService
        .fetchMe(role)
        .pipe(
          catchError(() => {
            token.clear();
            authState.clearUser();
            return of(null);
          }),
        )
        .subscribe((res) => {
          if (res?.data) authState.setUser(res.data);
        });
    }
  }
}
