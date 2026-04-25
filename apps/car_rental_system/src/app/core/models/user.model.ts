export type UserRole = 'admin' | 'customer';

export interface User {
  [key: string]: unknown;
  id: number;
  name: string;
  email: string;
  phone: string | null;
  country: string | null;
  wallet: string;
  role: UserRole;
  created_at: string;
  updated_at?: string;
  orders?: unknown[];
}

export interface AuthResponse {
  message: string;
  user: AuthUser;
  token: string;
}

export interface AuthUser extends User {
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  country?: string;
}
