import {
  AfterViewInit,
  Component,
  effect,
  inject,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersStore } from './store/orders.store';
import { AdminOrdersService } from '../../services/admin-orders.service';
import {
  LibBadge,
  LibButton,
  LibSearchInput,
  LibSpinner,
  LibTable,
  OffcanvasService,
  TableColumn,
} from '@ui-lib';
import { TranslocoPipe } from '@jsverse/transloco';
import { Order } from '../../../../core/models';

@Component({
  selector: 'app-admin-orders',
  imports: [
    CommonModule,
    LibTable,
    LibButton,
    LibSearchInput,
    LibBadge,
    LibSpinner,
    TranslocoPipe,
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
  providers: [AdminOrdersStore],
})
export class AdminOrders implements AfterViewInit {
  protected readonly store = inject(AdminOrdersStore);
  protected readonly offcanvasService = inject(OffcanvasService);
  private readonly ordersService = inject(AdminOrdersService);

  private readonly tplId = viewChild.required<TemplateRef<void>>('colId');
  private readonly tplUser = viewChild.required<TemplateRef<void>>('colUser');
  private readonly tplCar = viewChild.required<TemplateRef<void>>('colCar');
  private readonly tplTotal = viewChild.required<TemplateRef<void>>('colTotal');
  private readonly tplStatus =
    viewChild.required<TemplateRef<void>>('colStatus');
  private readonly tplOrderDetail =
    viewChild.required<TemplateRef<void>>('orderDetail');

  protected readonly columns = signal<TableColumn[]>([]);
  protected readonly selectedOrder = signal<Order | null>(null);
  protected readonly detailLoading = signal(false);
  protected readonly detailError = signal<string | null>(null);

  constructor() {
    // Keep selectedOrder in sync with store.orders() so that status updates
    // from the action buttons are immediately reflected inside the offcanvas.
    effect(() => {
      const current = this.selectedOrder();
      if (!current) return;
      const updated = this.store.orders().find((o) => o.id === current.id);
      if (updated) this.selectedOrder.set(updated);
    });
  }

  ngAfterViewInit(): void {
    this.columns.set([
      {
        field: 'id',
        header: 'id',
        headerTemplate: this.tplId(),
        showViewIcon: true,
      },
      {
        field: 'user',
        header: 'user',
        headerTemplate: this.tplUser(),
        render: (_, row: Record<string, unknown>) =>
          (row['user'] as { name?: string } | undefined)?.name ??
          String(Number(row['user_id'])),
      },
      {
        field: 'car',
        header: 'car',
        headerTemplate: this.tplCar(),
        render: (_, row: Record<string, unknown>) =>
          (row['car'] as { name?: string } | undefined)?.name ??
          String(Number(row['car_id'])),
      },
      {
        field: 'total_price',
        header: 'total_price',
        headerTemplate: this.tplTotal(),
        type: 'currency',
      },
      {
        field: 'payment_status',
        header: 'payment_status',
        headerTemplate: this.tplStatus(),
      },
    ]);
  }

  protected openOrderDetail(row: Record<string, unknown>): void {
    this.selectedOrder.set(null);
    this.detailError.set(null);
    this.detailLoading.set(true);

    this.offcanvasService.open(this.tplOrderDetail(), {
      title: `Order #${row['id']}`,
      description: (row['car'] as { name?: string } | undefined)?.name ?? '',
    });

    this.ordersService.getById(Number(row['id'])).subscribe({
      next: (order) => {
        this.selectedOrder.set(order);
        this.detailLoading.set(false);
      },
      error: () => {
        this.detailError.set('Failed to load order details.');
        this.detailLoading.set(false);
      },
    });
  }
}
