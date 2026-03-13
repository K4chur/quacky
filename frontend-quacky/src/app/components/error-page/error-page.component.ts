import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error-page',
  imports: [RouterLink],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css',
})
export class ErrorPage {
  protected playQuack() {
    let audio = new Audio();
    audio.src = '/assets/common/quack.wav';
    audio.volume = 0.05;
    audio.load();
    audio.play().then((r) => {});
  }

}
