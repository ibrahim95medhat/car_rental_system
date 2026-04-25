import {
  AfterViewInit,
  Component,
  inject,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {
  LibButton,
  LibNavbar,
  LibModal,
  NavItem,
  NavbarUser,
  ModalService,
} from '@ui-lib';
import { TranslocoService, TranslocoPipe } from '@jsverse/transloco';
import { AuthStateService } from '../../../core/services/auth-state/auth-state.service';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { TokenService } from '../../../core/services/token/token.service';

@Component({
  selector: 'app-application-layout',
  imports: [RouterOutlet, LibNavbar, LibModal, LibButton, TranslocoPipe],
  templateUrl: './application-layout.html',
  styleUrl: './application-layout.css',
})
export class ApplicationLayout implements AfterViewInit {
  private readonly authState = inject(AuthStateService);
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  private readonly transloco = inject(TranslocoService);
  private readonly document = inject(DOCUMENT);
  protected readonly modalService = inject(ModalService);

  private readonly tplCars = viewChild.required<TemplateRef<void>>('tplCars');
  private readonly tplOrders =
    viewChild.required<TemplateRef<void>>('tplOrders');
  private readonly tplInstallments =
    viewChild.required<TemplateRef<void>>('tplInstallments');

  protected readonly navItems = signal<NavItem[]>([]);

  ngAfterViewInit(): void {
    this.navItems.set([
      { label: 'cars', path: '/cars', labelTemplate: this.tplCars() },
      { label: 'orders', path: '/orders', labelTemplate: this.tplOrders() },
      {
        label: 'installments',
        path: '/installments',
        labelTemplate: this.tplInstallments(),
      },
    ]);
  }

  protected readonly navbarUser = (): NavbarUser | null => {
    const u = this.authState.user();
    return u
      ? {
          name: u.name,
          subtitle: this.transloco.translate('LOGIN_ROLE_CUSTOMER'),
        }
      : null;
  };

  protected onMenuToggle(): void {
    /* handled by lib-navbar */
  }

  protected onLangToggle(): void {
    const current = this.transloco.getActiveLang();
    const next = current === 'en' ? 'ar' : 'en';
    this.transloco.setActiveLang(next);
    this.document.documentElement.setAttribute(
      'dir',
      next === 'ar' ? 'rtl' : 'ltr',
    );
    this.document.documentElement.setAttribute('lang', next);
  }

  protected onLogout(): void {
    this.authService.logout('customer').subscribe({
      complete: () => this.clearAndRedirect(),
      error: () => this.clearAndRedirect(),
    });
  }

  private clearAndRedirect(): void {
    this.tokenService.clear();
    this.authState.clearUser();
    this.router.navigate(['/login']);
  }
}
