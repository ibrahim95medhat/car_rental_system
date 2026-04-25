export type { OrdersListState } from '../../models/list.model';
import { OrdersListState } from '../../models/list.model';

export const initialOrdersListState: OrdersListState = {
  orders: [],
  ordersMeta: null,
  ordersLoading: false,
};
