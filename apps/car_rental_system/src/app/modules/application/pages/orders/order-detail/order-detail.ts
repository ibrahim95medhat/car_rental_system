import { Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { CustomerOrdersService } from '../../../services/customer-orders.service';
import { Order } from '../../../../../core/models';
import { LibBadge, LibSpinner, BadgeVariant } from '@ui-lib';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-customer-order-detail',
  imports: [RouterLink, SlicePipe, LibSpinner, LibBadge, TranslocoPipe],
  templateUrl: './order-detail.html',
})
export class CustomerOrderDetail implements OnInit {
  readonly id = input.required<string>();

  private readonly ordersService = inject(CustomerOrdersService);

  protected readonly order = signal<Order | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);

  ngOnInit(): void {
    this.ordersService.getById(Number(this.id())).subscribe({
      next: (res) => {
        this.order.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  protected statusVariant(status: string): BadgeVariant {
    const map: Record<string, BadgeVariant> = {
      success: 'success',
      failed: 'danger',
      pending: 'warning',
    };
    return map[status] ?? 'default';
  }

  protected statusLabel(status: string): string {
    const map: Record<string, string> = {
      success: 'Paid',
      failed: 'Failed',
      pending: 'Pending',
    };
    return map[status] ?? status;
  }
}
