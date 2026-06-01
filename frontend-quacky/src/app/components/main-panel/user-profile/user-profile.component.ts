import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../services/chat.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-4 border-b border-slate-800/60 flex flex-col gap-3 bg-slate-950/40">
      <div class="flex flex-row items-center justify-between">
        <div class="relative group">
          <div class="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500/50 p-[2px] bg-slate-850 hover:border-amber-400 transition-all duration-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
            <img class="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300" [src]="currentUser().avatar" alt="user_avatar">
          </div>
          <!-- Online indicator -->
          <span class="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full ring-2 ring-slate-900 bg-emerald-500"></span>
        </div>
        
        <!-- Controls Hub: Theme Toggle, Settings, Logout -->
        <div class="flex items-center gap-1.5">
          <!-- Theme Toggle Button -->
          <button 
            (click)="chatService.toggleTheme()"
            class="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-300 hover:text-amber-400 hover:bg-slate-700/60 transition-all duration-200 cursor-pointer"
            [title]="isLightTheme() ? 'Switch to Dark Mode' : 'Switch to Light Mode'"
          >
            <i class="bi" [ngClass]="isLightTheme() ? 'bi-moon-fill' : 'bi-sun-fill'"></i>
          </button>

          <!-- Settings Trigger Button -->
          <button 
            (click)="chatService.openSettings()"
            class="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-300 hover:text-amber-400 hover:bg-slate-700/60 transition-all duration-200 cursor-pointer"
            title="Open Settings"
          >
            <i class="bi bi-gear-fill animate-hover-rotate"></i>
          </button>

          <!-- Logout Button (Exit to Landing) -->
          <button 
            routerLink="/"
            class="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-300 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-200 cursor-pointer"
            title="Logout"
          >
            <i class="bi bi-box-arrow-right"></i>
          </button>
        </div>
      </div>

      <!-- Username & Status Info -->
      <div class="flex flex-col">
        <h2 class="text-base font-bold text-slate-100 tracking-wide truncate">{{ currentUser().username }}</h2>
        <div class="flex flex-row items-center gap-1.5 mt-0.5 text-xs text-slate-400 font-medium">
          <i class="bi bi-chat-quote text-amber-500/70"></i>
          <span class="truncate italic" [title]="currentUser().status">{{ currentUser().status }}</span>
        </div>
      </div>
    </div>
  `
})
export class UserProfileComponent {
  chatService = inject(ChatService);
  currentUser = this.chatService.currentUser;
  isLightTheme = this.chatService.isLightTheme;
}
