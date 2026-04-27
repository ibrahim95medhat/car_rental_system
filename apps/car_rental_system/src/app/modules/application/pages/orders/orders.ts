import {
  Component,
  effect,
  inject,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  LibBadge,
  LibButton,
  LibInput,
  LibSearchInput,
  LibTable,
  OffcanvasService,
} from '@ui-lib';
import { CustomerOrdersService } from '../../services/customer-orders.service';
import { CustomerOrdersStore } from './store/orders.store';
import { TranslocoPipe } from '@jsverse/transloco';
import { Order } from '../../../../core/models';

@Component({
  selector: 'app-customer-orders',
  imports: [
    LibTable,
    LibInput,
    LibButton,
    LibBadge,
    LibSearchInput,
    ReactiveFormsModule,
    TranslocoPipe,
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
  providers: [CustomerOrdersStore],
})
export class CustomerOrders {
  protected readonly store = inject(CustomerOrdersStore);
  protected readonly offcanvasService = inject(OffcanvasService);
  private readonly ordersService = inject(CustomerOrdersService);
  protected readonly today = new Date().toISOString().split('T')[0];

  private readonly orderFormTmpl =
    viewChild<TemplateRef<unknown>>('orderFormTmpl');
  private readonly orderDetailTmpl =
    viewChild.required<TemplateRef<void>>('orderDetailTmpl');

  protected readonly selectedOrder = signal<Order | null>(null);
  protected readonly orderDetailLoading = signal(false);
  protected readonly orderDetailError = signal<string | null>(null);

  constructor() {
    effect(() => {
      const tmpl = this.orderFormTmpl();
      if (!tmpl) return;
      const carId = this.store.route.snapshot.queryParamMap.get('car_id');
      if (carId) this.store.openModal(tmpl);
    });
  }

  protected openOrderDetail(row: Record<string, unknown>): void {
    this.selectedOrder.set(null);
    this.orderDetailLoading.set(true);
    this.orderDetailError.set(null);

    const carName =
      (row['car'] as { name?: string } | undefined)?.name ??
      `#${row['car_id']}`;

    this.offcanvasService.open(this.orderDetailTmpl(), {
      title: `Order #${row['id']}`,
      description: carName,
      showCloseIcon: true,
    });

    this.ordersService.getById(Number(row['id'])).subscribe({
      next: (order) => {
        this.selectedOrder.set(order);
        this.orderDetailLoading.set(false);
      },
      error: () => {
        this.orderDetailError.set('Failed to load order details.');
        this.orderDetailLoading.set(false);
      },
    });
  }
}
