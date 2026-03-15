export type ToastLevel = 'success' | 'info' | 'warning' | 'danger';

export interface Toast {
  id: string;
  title: string;
  message: string;
  level: ToastLevel;
}
