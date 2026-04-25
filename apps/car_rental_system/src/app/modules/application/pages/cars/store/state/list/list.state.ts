export type { CustomerCarsListState } from '../../models/list.model';
import { CustomerCarsListState } from '../../models/list.model';

export const initialCustomerCarsListState: CustomerCarsListState = {
  cars: [],
  carsMeta: null,
  carsLoading: false,
};
