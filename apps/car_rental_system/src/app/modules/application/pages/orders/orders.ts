import {
  Component,
  inject,
  viewChild,
  TemplateRef,
  effect,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  LibBadge,
  LibButton,
  LibInput,
  LibSearchInput,
  LibTable,
} from '@ui-lib';
import { CustomerOrdersStore } from './store/orders.store';
import { TranslocoPipe } from '@jsverse/transloco';

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
  protected readonly today = new Date().toISOString().split('T')[0];
  private readonly orderFormTmpl =
    viewChild<TemplateRef<unknown>>('orderFormTmpl');

  constructor() {
    effect(() => {
      const tmpl = this.orderFormTmpl();
      if (!tmpl) return;
      const carId = this.store.route.snapshot.queryParamMap.get('car_id');
      if (carId) this.store.openModal(tmpl);
    });
  }
}
