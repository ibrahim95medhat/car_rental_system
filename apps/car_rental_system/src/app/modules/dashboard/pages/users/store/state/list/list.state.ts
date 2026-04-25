export type { UsersListState } from '../../models/list.model';
import { UsersListState } from '../../models/list.model';

export const initialUsersListState: UsersListState = {
  users: [],
  usersMeta: null,
  usersLoading: false,
};
