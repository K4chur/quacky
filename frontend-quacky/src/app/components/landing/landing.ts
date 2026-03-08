import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

  protected playQuack() {
    let audio = new Audio();
    audio.src = '/assets/common/quack.wav';
    audio.volume = 0.05;
    audio.load();
    audio.play().then((r) => {});
  }

}
