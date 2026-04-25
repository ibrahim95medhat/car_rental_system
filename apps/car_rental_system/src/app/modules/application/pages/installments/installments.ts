import { Component, inject } from '@angular/core';
import { InstallmentsStore } from './store/installments.store';
import { LibButton, LibTable, LibSearchInput, TableColumn } from '@ui-lib';
import { Installment } from '../../../../core/models';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-customer-installments',
  imports: [LibTable, LibButton, LibSearchInput, TranslocoPipe],
  templateUrl: './installments.html',
  styleUrl: './installments.css',
  providers: [InstallmentsStore],
})
export class CustomerInstallments {
  protected readonly store = inject(InstallmentsStore);

  protected readonly columns: TableColumn[] = [
    { field: 'id', header: 'ID' },
    { field: 'order_id', header: 'Order' },
    { field: 'amount', header: 'Amount', type: 'currency' as const },
    { field: 'due_date', header: 'Due Date', type: 'date' as const },
    {
      field: 'status',
      header: 'Status',
      render: (val: unknown) => {
        const status = val as Installment['status'];
        const map: Record<string, string> = {
          paid: 'Paid',
          pending: 'Pending',
          overdue: 'Overdue',
        };
        return map[status] ?? String(status);
      },
    },
    { field: 'paid_at', header: 'Paid At', type: 'date' as const },
    { field: 'actions', header: '' },
  ];
}
