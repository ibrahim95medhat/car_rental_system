import {
  Component,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
  TemplateRef,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CustomerCarsService } from '../../../services/customer-cars.service';
import { CustomerOrdersStore } from '../../orders/store/orders.store';
import { Car } from '../../../../../core/models';
import { LibButton, LibInput, LibSpinner } from '@ui-lib';
import { TranslocoPipe } from '@jsverse/transloco';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-car-detail',
  imports: [
    RouterLink,
    DecimalPipe,
    LibSpinner,
    LibButton,
    LibInput,
    ReactiveFormsModule,
    TranslocoPipe,
  ],
  templateUrl: './car-detail.html',
  providers: [CustomerOrdersStore],
})
export class CustomerCarDetail implements OnInit {
  readonly id = input.required<string>();

  private readonly carsService = inject(CustomerCarsService);
  protected readonly ordersStore = inject(CustomerOrdersStore);
  protected readonly today = new Date().toISOString().split('T')[0];

  private readonly orderFormTmpl =
    viewChild.required<TemplateRef<unknown>>('orderFormTmpl');

  protected readonly car = signal<Car | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);

  ngOnInit(): void {
    this.carsService.getById(Number(this.id())).subscribe({
      next: (res) => {
        this.car.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  protected rentNow(): void {
    this.ordersStore.form.reset({
      payment_type: 'cash',
      order_type: 'full',
      car_id: Number(this.id()),
    });
    this.ordersStore.openModal(this.orderFormTmpl());
  }
}
