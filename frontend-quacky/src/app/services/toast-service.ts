import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast, ToastLevel } from '../models/Toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _toasts$ = new BehaviorSubject<Toast[]>([]);
  toasts$ = this._toasts$.asObservable();

  show(message: string, level: ToastLevel = 'info', title: string) {
    const toast: Toast = { id: crypto.randomUUID(), title, message, level};
    const list = [...this._toasts$.value, toast];
    this._toasts$.next(list);

    // auto-remove
    setTimeout(() => this.remove(toast.id), 5000);
  }

  success(msg: string, title: string) {
    this.show(msg, 'success', title);
  }
  info(msg: string, title: string) {
    this.show(msg, 'info', title);
  }
  warning(msg: string, title: string) {
    this.show(msg, 'warning', title);
  }
  error(msg: string, title: string) {
    this.show(msg, 'danger', title);
  }

  remove(id: string) {
    this._toasts$.next(this._toasts$.value.filter((t) => t.id !== id));
  }

  clear() {
    this._toasts$.next([]);
  }

}
