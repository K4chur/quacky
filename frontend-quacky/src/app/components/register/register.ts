import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { RouterLink } from '@angular/router';
import { ProfilePictureModal } from '../../profile-picture-modal/profile-picture-modal';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, ProfilePictureModal],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  profilePath: string = 'assets/profilePictures/ducky_quacky_avatar_default.png';
  showModal = false;

  registerForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    avatar: new FormControl(''),
  });

  protected onSubmit() {
    console.log(this.registerForm.value);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  protected updateProfilePic($event: string) {
    this.profilePath = $event;
  }
}
