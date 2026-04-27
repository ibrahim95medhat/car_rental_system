import {
  Component,
  inject,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { CustomerCarsStore } from './store/cars.store';
import { CustomerCarsService } from '../../services/customer-cars.service';
import { CustomerOrdersStore } from '../orders/store/orders.store';
import {
  LibPagination,
  LibButton,
  LibInput,
  LibSearchInput,
  OffcanvasService,
} from '@ui-lib';
import { TranslocoPipe } from '@jsverse/transloco';
import { Car } from '../../../../core/models';

@Component({
  selector: 'app-customer-cars',
  imports: [
    ReactiveFormsModule,
    LibPagination,
    LibButton,
    LibInput,
    LibSearchInput,
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
  protected readonly offcanvasService = inject(OffcanvasService);
  private readonly carsService = inject(CustomerCarsService);
  protected readonly today = new Date().toISOString().split('T')[0];

  private readonly orderFormTmpl =
    viewChild.required<TemplateRef<unknown>>('orderFormTmpl');
  private readonly carDetailTmpl =
    viewChild.required<TemplateRef<void>>('carDetailTmpl');

  protected readonly selectedCar = signal<Car | null>(null);
  protected readonly carDetailLoading = signal(false);
  protected readonly carDetailError = signal<string | null>(null);

  protected viewDetails(carId: number, carName: string): void {
    this.selectedCar.set(null);
    this.carDetailLoading.set(true);
    this.carDetailError.set(null);

    this.offcanvasService.open(this.carDetailTmpl(), {
      title: carName,
      showCloseIcon: true,
    });

    this.carsService.getById(carId).subscribe({
      next: (car) => {
        this.selectedCar.set(car);
        this.carDetailLoading.set(false);
      },
      error: () => {
        this.carDetailError.set('Failed to load car details.');
        this.carDetailLoading.set(false);
      },
    });
  }

  protected rentNow(carId: number): void {
    this.ordersStore.form.reset({
      payment_type: 'cash',
      order_type: 'full',
      car_id: carId,
    });
    this.ordersStore.openModal(this.orderFormTmpl());
  }
}
