import {
  AfterViewInit,
  Component,
  inject,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  LibNavbar,
  LibSidebar,
  LibModal,
  ModalService,
  SidebarItem,
  CARS_ICON_PATH,
  ORDERS_ICON_PATH,
  LOGOUT_ICON_PATH,
  NavbarUser,
} from '@ui-lib';
import { TranslocoService, TranslocoPipe } from '@jsverse/transloco';
import { AuthStateService } from '../../../core/services/auth-state/auth-state.service';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { TokenService } from '../../../core/services/token/token.service';
import { LanguageSwitcherComponent } from '../../../core/component/language-switcher/language-switcher';

@Component({
  selector: 'app-application-layout',
  imports: [
    RouterOutlet,
    LibNavbar,
    LibSidebar,
    LibModal,
    TranslocoPipe,
    LanguageSwitcherComponent,
  ],
  templateUrl: './application-layout.html',
  styleUrl: './application-layout.css',
})
export class ApplicationLayout implements AfterViewInit {
  private readonly authState = inject(AuthStateService);
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  private readonly transloco = inject(TranslocoService);
  protected readonly modalService = inject(ModalService);

  private readonly tplCars = viewChild.required<TemplateRef<void>>('tplCars');
  private readonly tplOrders =
    viewChild.required<TemplateRef<void>>('tplOrders');
  private readonly tplInstallments =
    viewChild.required<TemplateRef<void>>('tplInstallments');
  private readonly tplLogout =
    viewChild.required<TemplateRef<void>>('tplLogout');

  protected readonly sidebarItems = signal<SidebarItem[]>([]);
  protected readonly footerItems = signal<SidebarItem[]>([]);

  ngAfterViewInit(): void {
    this.sidebarItems.set([
      {
        label: 'cars',
        path: '/cars',
        icon: CARS_ICON_PATH,
        labelTemplate: this.tplCars(),
      },
      {
        label: 'orders',
        path: '/orders',
        icon: ORDERS_ICON_PATH,
        labelTemplate: this.tplOrders(),
      },
      {
        label: 'installments',
        path: '/installments',
        icon: ORDERS_ICON_PATH,
        labelTemplate: this.tplInstallments(),
      },
    ]);
    this.footerItems.set([
      {
        label: 'logout',
        action: 'logout',
        icon: LOGOUT_ICON_PATH,
        labelTemplate: this.tplLogout(),
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

  protected handleAction(action: string): void {
    if (action === 'logout') {
      this.authService.logout('customer').subscribe({
        complete: () => this.clearAndRedirect(),
        error: () => this.clearAndRedirect(),
      });
    }
  }

  private clearAndRedirect(): void {
    this.tokenService.clear();
    this.authState.clearUser();
    this.router.navigate(['/login']);
  }
}
