import { User } from '../../../../../../core/models';
import { PaginatedResponse } from '@ui-lib';

export interface UsersListState {
  users: User[];
  usersMeta: Omit<PaginatedResponse<User>, 'data'> | null;
  usersLoading: boolean;
}
