import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { randomUUID } from 'node:crypto';

@Component({
  selector: 'app-profile-picture-modal',
  imports: [ImageCropperComponent],
  templateUrl: './profile-picture-modal.html',
  styleUrl: './profile-picture-modal.css',
})
export class ProfilePictureModal {
  shown = input<boolean>(false);
  profilePath = input<string>('assets/profilePictures/ducky_quacky_avatar_default.png');
  profilePathUpdate = output<string>();
  profileFileUpdate = output<File | null>();
  close = output<void>();

  imageChangedEvent: Event | null = null;
  croppedImageEvent: ImageCroppedEvent | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  defaultPfPics: string[] = [
    'assets/profilePictures/ducky_quacky_avatar_default.png',
    'assets/profilePictures/ducky_quacky_avatar_sunglasses.png',
    'assets/profilePictures/ducky_quacky_avatar_smoker.png',
    'assets/profilePictures/ducky_quacky_avatar_cowboy.png',
    'assets/profilePictures/ducky_quacky_avatar_senior.png',
    'assets/profilePictures/ducky_quacky_avatar_monocle.png',
  ];

  constructor(private sanitizer: DomSanitizer) {}

  onClose() {
    this.close.emit();
  }

  protected picUpdate(path: string, file: File | null) {
    this.profilePathUpdate.emit(path);
    this.profileFileUpdate.emit(file);
  }

  protected triggerInput() {
    this.fileInput.nativeElement.click();
  }

  protected fileUpdate($event: Event) {
    if($event.target != null && $event.target instanceof HTMLInputElement && $event.target.files != null && $event.target.files.length > 0)
      this.imageChangedEvent = $event;
  }

  protected imageCropped($event: ImageCroppedEvent) {
    this.croppedImageEvent = $event;
  }

  confirmCrop() {
    this.imageChangedEvent = null;

    let blop = this.croppedImageEvent!.blob!;
    let url =  this.croppedImageEvent!.objectUrl!;
    let file = new File([blop], crypto.randomUUID(), { type: 'image/png' });

    this.picUpdate(url, file);
  }
}


