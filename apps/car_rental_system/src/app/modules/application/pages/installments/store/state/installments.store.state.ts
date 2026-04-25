import {
  InstallmentsListState,
  initialInstallmentsListState,
} from './list/list.state';

export type InstallmentsState = InstallmentsListState & {
  payingId: number | null;
  page: number;
  perPage: number;
  search: string;
};

export const initialInstallmentsState: InstallmentsState = {
  ...initialInstallmentsListState,
  payingId: null,
  page: 1,
  perPage: 10,
  search: '',
};
