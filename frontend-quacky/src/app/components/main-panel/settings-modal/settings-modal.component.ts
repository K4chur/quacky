import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (chatService.isSettingsOpen()) {
      <div class="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm animate-fade-in">
        
        <!-- Modal Card Box -->
        <div class="bg-slate-900/95 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative mx-4 animate-scale-up modal-card">
          
          <!-- Close X Button -->
          <button 
            (click)="chatService.closeSettings()"
            class="absolute top-4 right-4 text-slate-400 hover:text-slate-100 cursor-pointer transition-colors"
          >
            <i class="bi bi-x-lg text-lg"></i>
          </button>

          <!-- Modal Title -->
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 text-xl border border-amber-500/20">
              <i class="bi bi-sliders"></i>
            </div>
            <div>
              <h2 class="text-lg font-black text-slate-100 tracking-wide modal-title">Pond Settings</h2>
              <p class="text-[10px] text-slate-400 mt-0.5">Customize your ducky identity</p>
            </div>
          </div>

          <!-- Settings Content -->
          <div class="space-y-5">
            
            <!-- Avatar Picker Grid -->
            <div>
              <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 select-label">Choose Your Feather Outfit</label>
              <div class="grid grid-cols-6 gap-2">
                @for (av of availableAvatars; track av) {
                  <button 
                    (click)="settingsAvatar.set(av)"
                    class="aspect-square rounded-xl overflow-hidden border p-0.5 transition-all duration-300 relative group cursor-pointer bg-slate-800 choice-avatar"
                    [ngClass]="settingsAvatar() === av 
                      ? 'border-amber-500 ring-4 ring-amber-500/20 scale-105' 
                      : 'border-slate-800 hover:border-slate-500 hover:scale-103'"
                  >
                    <img class="w-full h-full rounded-lg object-cover" [src]="av" alt="avatar_choice">
                    
                    @if (settingsAvatar() === av) {
                      <span class="absolute inset-0 bg-amber-500/10 flex items-center justify-center text-amber-400 text-xs font-bold rounded-lg">
                        <i class="bi bi-check-lg text-sm bg-slate-900/90 rounded-full p-0.5 shadow-sm"></i>
                      </span>
                    }
                  </button>
                }
              </div>
            </div>

            <!-- Nickname Text input -->
            <div>
              <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 select-label" for="nickname-input">Ducky Nickname</label>
              <div class="relative">
                <input 
                  type="text" 
                  id="nickname-input"
                  [(ngModel)]="settingsUsername"
                  placeholder="e.g. Sir Quacks-a-Lot"
                  maxlength="20"
                  class="w-full h-10 px-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 text-xs md:text-sm font-semibold outline-none transition-all input-field"
                >
                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-600 font-bold">
                  {{ settingsUsername().length }}/20
                </span>
              </div>
            </div>

            <!-- Status Message input -->
            <div>
              <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 select-label" for="status-input">Duck Status</label>
              <input 
                type="text" 
                id="status-input"
                [(ngModel)]="settingsStatus"
                placeholder="e.g. Coding like a duck 🦆"
                maxlength="40"
                class="w-full h-10 px-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 text-xs md:text-sm font-semibold outline-none transition-all input-field"
              >
            </div>

          </div>

          <!-- Modal Actions (Buttons) -->
          <div class="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-slate-800/80">
            <button 
              (click)="chatService.closeSettings()"
              class="px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-xs font-bold cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button 
              (click)="save()"
              [disabled]="!settingsUsername().trim()"
              class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 text-xs font-black shadow-md cursor-pointer transition-all duration-200"
              [ngClass]="!settingsUsername().trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-103 active:scale-97'"
            >
              Save Changes
            </button>
          </div>

        </div>
      </div>
    }
  `
})
export class SettingsModalComponent {
  chatService = inject(ChatService);
  
  settingsUsername = signal('');
  settingsStatus = signal('');
  settingsAvatar = signal('');

  availableAvatars = [
    'assets/profilePictures/ducky_quacky_avatar_default.png',
    'assets/profilePictures/ducky_quacky_avatar_senior.png',
    'assets/profilePictures/ducky_quacky_avatar_cowboy.png',
    'assets/profilePictures/ducky_quacky_avatar_monocle.png',
    'assets/profilePictures/ducky_quacky_avatar_smoker.png',
    'assets/profilePictures/ducky_quacky_avatar_sunglasses.png',
  ];

  constructor() {
    effect(() => {
      if (this.chatService.isSettingsOpen()) {
        const user = this.chatService.currentUser();
        this.settingsUsername.set(user.username);
        this.settingsStatus.set(user.status);
        this.settingsAvatar.set(user.avatar);
      }
    });
  }

  save() {
    this.chatService.saveSettings(
      this.settingsUsername(),
      this.settingsStatus(),
      this.settingsAvatar()
    );
  }
}
