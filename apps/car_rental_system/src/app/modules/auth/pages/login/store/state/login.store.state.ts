export type { LoginState } from '../types/login.store.types';
import { LoginState } from '../types/login.store.types';

export const initialLoginState: LoginState = {
  isLoading: false,
  serverError: null,
  selectedRole: 'customer',
};
