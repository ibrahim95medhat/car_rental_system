export type { InstallmentsListState } from '../../models/list.model';
import { InstallmentsListState } from '../../models/list.model';

export const initialInstallmentsListState: InstallmentsListState = {
  installments: [],
  installmentsMeta: null,
  installmentsLoading: false,
};
