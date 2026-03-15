import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  ducks = Array.from({ length: 10 }).map((_, i) => ({
    delay: Math.random() > 0.5 ? `${i * 0.7}s` : `0s`,
    duration: `${6 + Math.random() * 4}s`,
    stepLeft: `${i * 10 + 5}%`,
  }));
}
