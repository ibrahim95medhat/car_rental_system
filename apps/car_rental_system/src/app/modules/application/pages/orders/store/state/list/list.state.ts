export type { CustomerOrdersListState } from '../../models/list.model';
import { CustomerOrdersListState } from '../../models/list.model';

export const initialCustomerOrdersListState: CustomerOrdersListState = {
  orders: [],
  ordersMeta: null,
  ordersLoading: false,
};
