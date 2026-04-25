export type { CarsFiltersState } from '../../models/filters.model';
import { CarsFiltersState } from '../../models/filters.model';

export const initialCarsFiltersState: CarsFiltersState = {
  filters: {
    page: 1,
    per_page: 10,
  },
};
