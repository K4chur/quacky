import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-profile-picture-modal',
  imports: [],
  templateUrl: './profile-picture-modal.html',
  styleUrl: './profile-picture-modal.css',
})
export class ProfilePictureModal {
  shown = input<boolean>(false);
  profilePath = input<string>('assets/profilePictures/ducky_quacky_avatar_default.png');
  profilePicUpdate = output<string>();
  close = output<void>();

  defaultPfPics: string[] = [
    'assets/profilePictures/ducky_quacky_avatar_default.png',
    'assets/profilePictures/ducky_quacky_avatar_sunglasses.png',
    'assets/profilePictures/ducky_quacky_avatar_smoker.png',
    'assets/profilePictures/ducky_quacky_avatar_cowboy.png',
    'assets/profilePictures/ducky_quacky_avatar_senior.png',
    'assets/profilePictures/ducky_quacky_avatar_monocle.png',
  ];

  onClose() {
    this.close.emit();
  }

  protected picUpdate(path :string) {
    this.profilePicUpdate.emit(path)
  }
}


