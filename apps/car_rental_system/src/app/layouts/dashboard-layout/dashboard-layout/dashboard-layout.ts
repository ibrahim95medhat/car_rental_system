import {
  AfterViewInit,
  Component,
  inject,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  LibNavbar,
  LibSidebar,
  LibModal,
  ModalService,
  SidebarItem,
  USERS_ICON_PATH,
  CARS_ICON_PATH,
  ORDERS_ICON_PATH,
  LOGOUT_ICON_PATH,
} from '@ui-lib';
import { TranslocoPipe } from '@jsverse/transloco';
import { DashboardLayoutStore } from '../store/dashboard-layout.store';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, LibNavbar, LibSidebar, LibModal, TranslocoPipe],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
  providers: [DashboardLayoutStore],
})
export class DashboardLayout implements AfterViewInit {
  protected readonly store = inject(DashboardLayoutStore);
  readonly modalService = inject(ModalService);

  private readonly tplUsers = viewChild.required<TemplateRef<void>>('tplUsers');
  private readonly tplCars = viewChild.required<TemplateRef<void>>('tplCars');
  private readonly tplOrders =
    viewChild.required<TemplateRef<void>>('tplOrders');
  private readonly tplLogout =
    viewChild.required<TemplateRef<void>>('tplLogout');

  protected readonly sidebarItems = signal<SidebarItem[]>([]);
  protected readonly footerItems = signal<SidebarItem[]>([]);

  ngAfterViewInit(): void {
    this.sidebarItems.set([
      {
        label: 'users',
        path: '/admin/users',
        icon: USERS_ICON_PATH,
        labelTemplate: this.tplUsers(),
      },
      {
        label: 'cars',
        path: '/admin/cars',
        icon: CARS_ICON_PATH,
        labelTemplate: this.tplCars(),
      },
      {
        label: 'orders',
        path: '/admin/orders',
        icon: ORDERS_ICON_PATH,
        labelTemplate: this.tplOrders(),
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
}
