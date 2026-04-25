import {
  CustomerOrdersListState,
  initialCustomerOrdersListState,
} from './list/list.state';
import { CustomerOrdersExtraState } from '../models/extra.model';

export type { CustomerOrdersExtraState } from '../models/extra.model';
export type CustomerOrdersState = CustomerOrdersListState &
  CustomerOrdersExtraState;

export const initialCustomerOrdersState: CustomerOrdersState = {
  ...initialCustomerOrdersListState,
  submitting: false,
  page: 1,
  perPage: 10,
  search: '',
};
