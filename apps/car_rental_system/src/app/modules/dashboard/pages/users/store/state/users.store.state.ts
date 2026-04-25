import { UsersListState, initialUsersListState } from './list/list.state';
import {
  UsersFiltersState,
  initialUsersFiltersState,
} from './filters/filters.state';

export type UsersState = UsersListState & UsersFiltersState;

export const initialUsersState: UsersState = {
  ...initialUsersListState,
  ...initialUsersFiltersState,
};
