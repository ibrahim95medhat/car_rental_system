import { Injectable, signal } from '@angular/core';
import { ToastData } from '../../models/toast/toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toast = signal<ToastData | null>(null);

  private timer: ReturnType<typeof setTimeout> | null = null;

  show(data: ToastData): void {
    if (this.timer) clearTimeout(this.timer);
    this.toast.set(data);
    this.timer = setTimeout(() => this.dismiss(), data.duration ?? 5000);
  }

  success(title: string, message?: string, duration?: number): void {
    this.show({ type: 'success', title, message, duration });
  }

  error(title: string, message?: string, duration?: number): void {
    this.show({ type: 'error', title, message, duration });
  }

  warning(title: string, message?: string, duration?: number): void {
    this.show({ type: 'warning', title, message, duration });
  }

  info(title: string, message?: string, duration?: number): void {
    this.show({ type: 'info', title, message, duration });
  }

  dismiss(): void {
    if (this.timer) clearTimeout(this.timer);
    this.toast.set(null);
  }
}
