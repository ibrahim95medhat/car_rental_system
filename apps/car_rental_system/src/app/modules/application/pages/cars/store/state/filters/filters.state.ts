export type { CustomerCarsFiltersState } from '../../models/filters.model';
import { CustomerCarsFiltersState } from '../../models/filters.model';

export const initialCustomerCarsFiltersState: CustomerCarsFiltersState = {
  filters: {
    page: 1,
    per_page: 12,
  },
};
