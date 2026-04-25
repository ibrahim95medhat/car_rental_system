import { Component, inject, viewChild, TemplateRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkWithHref } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CustomerCarsStore } from './store/cars.store';
import { CustomerOrdersStore } from '../orders/store/orders.store';
import { LibPagination, LibButton, LibInput, LibSearchInput } from '@ui-lib';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-customer-cars',
  imports: [
    ReactiveFormsModule,
    LibPagination,
    LibButton,
    LibInput,
    LibSearchInput,
    RouterLink,
    RouterLinkWithHref,
    DecimalPipe,
    TranslocoPipe,
  ],
  templateUrl: './cars.html',
  styleUrl: './cars.css',
  providers: [CustomerCarsStore, CustomerOrdersStore],
})
export class CustomerCars {
  protected readonly store = inject(CustomerCarsStore);
  protected readonly ordersStore = inject(CustomerOrdersStore);
  protected readonly today = new Date().toISOString().split('T')[0];

  private readonly orderFormTmpl =
    viewChild.required<TemplateRef<unknown>>('orderFormTmpl');

  protected rentNow(carId: number): void {
    this.ordersStore.form.reset({
      payment_type: 'cash',
      order_type: 'full',
      car_id: carId,
    });
    this.ordersStore.openModal(this.orderFormTmpl());
  }
}
