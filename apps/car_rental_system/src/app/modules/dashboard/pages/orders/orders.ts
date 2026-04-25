import {
  AfterViewInit,
  Component,
  inject,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { AdminOrdersStore } from './store/orders.store';
import {
  LibBadge,
  LibButton,
  LibSearchInput,
  LibTable,
  TableColumn,
} from '@ui-lib';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-admin-orders',
  imports: [LibTable, LibButton, LibSearchInput, LibBadge, TranslocoPipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
  providers: [AdminOrdersStore],
})
export class AdminOrders implements AfterViewInit {
  protected readonly store = inject(AdminOrdersStore);

  private readonly tplId = viewChild.required<TemplateRef<void>>('colId');
  private readonly tplUser = viewChild.required<TemplateRef<void>>('colUser');
  private readonly tplCar = viewChild.required<TemplateRef<void>>('colCar');
  private readonly tplTotal = viewChild.required<TemplateRef<void>>('colTotal');
  private readonly tplStatus =
    viewChild.required<TemplateRef<void>>('colStatus');
  private readonly tplActions =
    viewChild.required<TemplateRef<void>>('colActions');

  protected readonly columns = signal<TableColumn[]>([]);

  ngAfterViewInit(): void {
    this.columns.set([
      {
        field: 'id',
        header: 'id',
        headerTemplate: this.tplId(),
        showViewIcon: true,
        viewIconRouterLink: (row) => ['/admin/orders', String(row['id'])],
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
      {
        field: 'actions',
        header: 'actions',
        headerTemplate: this.tplActions(),
      },
    ]);
  }
}
