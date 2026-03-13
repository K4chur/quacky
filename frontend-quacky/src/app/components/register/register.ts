import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProfilePictureModal } from '../../profile-picture-modal/profile-picture-modal';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, ProfilePictureModal],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  profilePath: string = 'assets/profilePictures/ducky_quacky_avatar_default.png';
  profileFile: File | null = null;
  showModal = false;

  registerForm: FormGroup;
  email: FormControl;
  username;
  password;
  confirmPassword;
  avatar;

  constructor() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.username = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(32),
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(64),
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(64),
    ]);
    this.avatar = new FormControl('');

    this.registerForm = new FormGroup({
      email: this.email,
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
      avatar: this.avatar,
    }, {validators: this.passwordMatchValidator()});
  }

  passwordMatchValidator() {
    return (formGroup: AbstractControl) => {
      const password = this.password.value;
      const confirmPassword = this.confirmPassword.value;

      return password === confirmPassword ? null : { mismatch: true };
    };
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

  protected updateProfileFile($event: File | null) {
    this.profileFile = $event;
  }

  protected onSubmit() {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
    }
  }
}
