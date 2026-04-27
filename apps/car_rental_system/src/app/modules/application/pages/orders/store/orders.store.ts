import { computed, DestroyRef, inject, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { initialCustomerOrdersState } from './state/orders.store.state';
import { CustomerOrdersService } from '../../../services/customer-orders.service';
import { createLoadCustomerOrdersMethod } from './features/load-orders/methods/load-orders.method';
import { createOrderMethod } from './features/create-order/methods/create-order.method';
import { ModalService, TableColumn, ToastService } from '@ui-lib';
import {
  CreateOrderPayload,
  OrderType,
  PaymentType,
} from '../../../../../core/models';
import { TranslocoService } from '@jsverse/transloco';

const todayStr = () => new Date().toISOString().split('T')[0];

function pastDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  return control.value < todayStr() ? { pastDate: true } : null;
}

function receivingAfterDelivery(
  group: AbstractControl,
): ValidationErrors | null {
  const delivery = group.get('delivery_date')?.value;
  const receiving = group.get('receiving_date')?.value;
  if (!delivery || !receiving) return null;
  const receivingCtrl = group.get('receiving_date');
  if (receiving <= delivery) {
    receivingCtrl?.setErrors({
      ...receivingCtrl.errors,
      receivingBeforeDelivery: true,
    });
    return { receivingBeforeDelivery: true };
  }
  if (receivingCtrl?.hasError('receivingBeforeDelivery')) {
    const { receivingBeforeDelivery: removed, ...rest } =
      receivingCtrl.errors ?? {};
    void removed;
    receivingCtrl.setErrors(Object.keys(rest).length ? rest : null);
  }
  return null;
}

export const CustomerOrdersStore = signalStore(
  withState(initialCustomerOrdersState),

  withProps(() => {
    const fb = inject(FormBuilder);
    const form = fb.nonNullable.group(
      {
        car_id: [0, [Validators.required, Validators.min(1)]],
        delivery_date: ['', [Validators.required, pastDateValidator]],
        receiving_date: ['', Validators.required],
        payment_type: ['cash' as PaymentType, Validators.required],
        order_type: ['full' as OrderType, Validators.required],
        down_payment: [0],
        number_of_installments: [0],
      },
      { validators: receivingAfterDelivery },
    );

    const orderTypeSignal = toSignal(form.controls.order_type.valueChanges, {
      initialValue: form.controls.order_type.value,
    });

    const deliverySignal = toSignal(form.controls.delivery_date.valueChanges, {
      initialValue: form.controls.delivery_date.value,
    });

    const receivingSignal = toSignal(
      form.controls.receiving_date.valueChanges,
      {
        initialValue: form.controls.receiving_date.value,
      },
    );

    const columns: TableColumn[] = [
      {
        field: 'id',
        header: 'ID',
        showViewIcon: true,
      },
      {
        field: 'car',
        header: 'Car',
        render: (_: unknown, row: Record<string, unknown>) => {
          const carName = (row['car'] as { name?: string } | undefined)?.name;
          const carId =
            typeof row['car_id'] === 'number' ? row['car_id'] : null;
          return carName ?? (carId === null ? '—' : `#${carId}`);
        },
      },
      { field: 'delivery_date', header: 'Delivery', type: 'date' },
      { field: 'receiving_date', header: 'Return', type: 'date' },
      { field: 'total_price', header: 'Total', type: 'currency' },
      { field: 'payment_type', header: 'Payment' },
      { field: 'payment_status', header: 'Status' },
      { field: 'order_type', header: 'Type' },
    ];

    return {
      ordersService: inject(CustomerOrdersService),
      destroyRef: inject(DestroyRef),
      modalSvc: inject(ModalService),
      toast: inject(ToastService),
      transloco: inject(TranslocoService),
      route: inject(ActivatedRoute),
      form,
      orderTypeSignal,
      deliverySignal,
      receivingSignal,
      columns,
      paymentTypes: ['cash', 'visa', 'tamara'] as PaymentType[],
      orderTypes: ['full', 'installments'] as OrderType[],
    };
  }),

  withComputed((store) => ({
    isInstallment: computed(() => store.orderTypeSignal() === 'installments'),
    estimatedDays: computed(() => {
      const d = store.deliverySignal();
      const r = store.receivingSignal();
      if (!d || !r) return 0;
      const diff = new Date(r).getTime() - new Date(d).getTime();
      return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }),
  })),

  withMethods((store) => ({
    loadOrders: createLoadCustomerOrdersMethod(store),
    createOrder: createOrderMethod(store),
  })),

  withMethods((store) => ({
    setPage(page: number): void {
      patchState(store, { page });
      store.loadOrders();
    },

    setPerPage(perPage: number): void {
      patchState(store, { perPage, page: 1 });
      store.loadOrders();
    },

    setSearch(search: string): void {
      patchState(store, { search, page: 1 });
      store.loadOrders();
    },

    openModal(tmpl: TemplateRef<unknown>): void {
      store.modalSvc.open({
        title: store.transloco.translate('ORDER_FORM_TITLE'),
        customizeContent: tmpl,
        onClose: () =>
          store.form.reset({
            payment_type: 'cash',
            order_type: 'full',
            car_id: 0,
          }),
      });
    },

    onSubmit(): void {
      store.form.markAllAsTouched();
      if (store.form.invalid) return;
      const v = store.form.getRawValue();
      const payload: CreateOrderPayload = {
        car_id: v.car_id,
        delivery_date: v.delivery_date,
        receiving_date: v.receiving_date,
        payment_type: v.payment_type,
        order_type: v.order_type,
        ...(v.order_type === 'installments'
          ? {
              down_payment: v.down_payment,
              number_of_installments: v.number_of_installments,
            }
          : {}),
      };
      store.createOrder(payload);
    },
  })),

  withHooks((store) => ({
    onInit: () => {
      store.loadOrders();
      const carId = store.route.snapshot.queryParamMap.get('car_id');
      if (carId) store.form.patchValue({ car_id: Number(carId) });
    },
  })),
);
