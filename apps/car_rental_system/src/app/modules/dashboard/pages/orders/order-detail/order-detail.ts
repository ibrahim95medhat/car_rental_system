import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminOrdersService } from '../../../services/admin-orders.service';
import { Order, PaymentStatus } from '../../../../../core/models';
import { TranslocoPipe } from '@jsverse/transloco';
import { ArrowLeftIconComponent, LibButton, LibSpinner } from '@ui-lib';

@Component({
  selector: 'app-order-detail',
  imports: [
    RouterLink,
    TranslocoPipe,
    ArrowLeftIconComponent,
    LibButton,
    LibSpinner,
  ],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly ordersService = inject(AdminOrdersService);

  protected readonly orderId = this.route.snapshot.paramMap.get('id');
  protected readonly order = signal<Order | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly updatingStatus = signal<PaymentStatus | null>(null);

  ngOnInit(): void {
    if (!this.orderId) return;
    this.loadOrder();
  }

  protected loadOrder(): void {
    this.loading.set(true);
    this.ordersService.getById(Number(this.orderId)).subscribe({
      next: (order) => {
        this.order.set(order);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load order details.');
        this.loading.set(false);
      },
    });
  }

  protected updateStatus(status: PaymentStatus): void {
    const id = Number(this.orderId);
    this.updatingStatus.set(status);
    this.ordersService
      .updatePaymentStatus(id, { payment_status: status })
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/orders']);
        },
        error: () => {
          this.updatingStatus.set(null);
        },
      });
  }
}
