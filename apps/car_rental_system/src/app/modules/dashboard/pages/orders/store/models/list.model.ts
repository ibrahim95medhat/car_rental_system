import { Order } from '../../../../../../core/models';
import { PaginatedResponse } from '@ui-lib';

export interface OrdersListState {
  orders: Order[];
  ordersMeta: Omit<PaginatedResponse<Order>, 'data'> | null;
  ordersLoading: boolean;
}
