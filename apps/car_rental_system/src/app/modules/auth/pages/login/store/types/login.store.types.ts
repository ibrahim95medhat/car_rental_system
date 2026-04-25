export type UserRole = 'admin' | 'customer';

export interface LoginState {
  isLoading: boolean;
  serverError: string | null;
  selectedRole: UserRole;
}
