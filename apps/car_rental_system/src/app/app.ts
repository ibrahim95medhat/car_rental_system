import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibToast } from '@ui-lib';
import { TokenService } from './core/services/token/token.service';
import { AuthStateService } from './core/services/auth-state/auth-state.service';
import { AuthService } from './modules/auth/services/auth.service';
import { catchError, of } from 'rxjs';

@Component({
  imports: [RouterModule, LibToast],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
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
