export type { OrdersFiltersState } from '../../models/filters.model';
import { OrdersFiltersState } from '../../models/filters.model';

export const initialOrdersFiltersState: OrdersFiltersState = {
  filters: {
    page: 1,
    per_page: 10,
  },
};
