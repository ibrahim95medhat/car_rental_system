export type { RegisterState } from '../types/register.store.types';
import { RegisterState } from '../types/register.store.types';

export const initialRegisterState: RegisterState = {
  isLoading: false,
  serverErrors: null,
  selectedRole: 'customer',
  country: new Intl.DisplayNames(['en'], { type: 'region' }).of('SA') ?? 'Saudi Arabia',
};
