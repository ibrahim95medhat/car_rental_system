export type { UsersFiltersState } from '../../models/filters.model';
import { UsersFiltersState } from '../../models/filters.model';

export const initialUsersFiltersState: UsersFiltersState = {
  filters: {
    page: 1,
    per_page: 10,
  },
};
