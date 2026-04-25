import {
  CustomerCarsListState,
  initialCustomerCarsListState,
} from './list/list.state';
import {
  CustomerCarsFiltersState,
  initialCustomerCarsFiltersState,
} from './filters/filters.state';

export type CustomerCarsState = CustomerCarsListState &
  CustomerCarsFiltersState;

export const initialCustomerCarsState: CustomerCarsState = {
  ...initialCustomerCarsListState,
  ...initialCustomerCarsFiltersState,
};
