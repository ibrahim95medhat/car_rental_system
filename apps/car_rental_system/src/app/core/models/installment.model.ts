export type InstallmentStatus = 'pending' | 'paid' | 'overdue';

export interface Installment {
  [key: string]: unknown;
  id: number;
  order_id: number;
  amount: number;
  due_date: string;
  status: InstallmentStatus;
  paid_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface InstallmentFilters {
  search?: string;
  per_page?: number;
  page?: number;
}
