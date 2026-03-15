import { Component } from '@angular/core';
import { ToastService } from '../../services/toast-service';
import { Toast } from '../../models/Toast';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [AsyncPipe],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  toasts$;
  constructor(private toastService: ToastService) {
    this.toasts$ = this.toastService.toasts$;
  }

  remove(t: Toast) {
    this.toastService.remove(t.id);
  }

  levelClass(level: Toast['level']) {
    switch (level) {
      case 'success':
        return 'text-green-400';
      case 'info':
        return 'text-white';
      case 'warning':
        return 'text-orange-300';
      case 'danger':
        return 'text-red-400';
    }
  }

  levelIcon(level: Toast['level']) {
    switch (level) {
      case 'success':
        return 'bi-check-square-fill';
      case 'info':
        return 'bi-info-square-fill';
      case 'warning':
        return 'bi-exclamation-triangle-fill';
      case 'danger':
        return 'bi-exclamation-octagon-fill';
    }
  }
}
