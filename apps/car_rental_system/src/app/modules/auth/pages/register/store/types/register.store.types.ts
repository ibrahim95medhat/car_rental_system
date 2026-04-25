export type UserRole = 'admin' | 'customer';

export interface RegisterState {
  isLoading: boolean;
  serverErrors: Record<string, string[]> | null;
  selectedRole: UserRole;
  country: string;
}
