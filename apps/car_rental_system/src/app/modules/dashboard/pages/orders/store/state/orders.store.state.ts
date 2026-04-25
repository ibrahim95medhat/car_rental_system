import { OrdersListState, initialOrdersListState } from './list/list.state';
import {
  OrdersFiltersState,
  initialOrdersFiltersState,
} from './filters/filters.state';
import { PaymentStatus } from '../../../../../../core/models';

export type OrdersState = OrdersListState &
  OrdersFiltersState & {
    updatingId: number | null;
    updatingStatus: PaymentStatus | null;
  };

export const initialOrdersState: OrdersState = {
  ...initialOrdersListState,
  ...initialOrdersFiltersState,
  updatingId: null,
  updatingStatus: null,
};
