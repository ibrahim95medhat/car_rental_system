export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastData {
  type: ToastType;
  title: string;
  message?: string;
  duration?: number; // ms, default 5000
}
