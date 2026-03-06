import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  ducks = Array.from({ length: 10 }).map((_, i) => ({
    delay: Math.random() > 0.5 ? `${i * 0.7}s` : `0s`,
    duration: `${6 + Math.random() * 4}s`,
    stepLeft: `${i * 10 + 5}%`,
  }));

  protected playQuack() {
    let audio = new Audio();
    audio.src = '/assets/common/quack.wav';
    audio.volume = 0.05
    audio.load();
    audio.play().then(r => {});
  }
}
