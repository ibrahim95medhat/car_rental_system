import { Installment } from '../../../../../../core/models';
import { PaginatedResponse } from '@ui-lib';

export interface InstallmentsListState {
  installments: Installment[];
  installmentsMeta: Omit<PaginatedResponse<Installment>, 'data'> | null;
  installmentsLoading: boolean;
}
