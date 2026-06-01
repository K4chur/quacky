import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-welcome-splash',
  standalone: true,
  imports: [CommonModule],
  host: { 'class': 'flex-1 flex flex-col overflow-hidden' },
  template: `
    <div class="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-900/10 animate-fade-in relative">
      
      <!-- Decorative Background Floating Orbs -->
      <div class="absolute w-72 h-72 rounded-full bg-amber-500/5 blur-[120px] top-1/4 left-1/3 pointer-events-none"></div>
      <div class="absolute w-80 h-80 rounded-full bg-teal-500/5 blur-[120px] bottom-1/4 right-1/3 pointer-events-none"></div>

      <!-- Splash Content -->
      <div class="max-w-md flex flex-col items-center animate-pulse-slow">
        
        <div class="quacky relative mb-8">
          <!-- Large Welcome Avatar/Logo -->
          <div class="w-32 h-32 rounded-full bg-slate-900/80 border border-slate-800/80 p-5 flex items-center justify-center shadow-2xl relative">
            <img class="w-full h-full object-contain" src="assets/common/ducky_quacky.svg" alt="quacky logo">
          </div>
          <span class="absolute -bottom-1 -right-1 block h-7 w-7 rounded-full bg-emerald-500 border-4 border-slate-900 shadow"></span>
        </div>

        <h1 class="text-2xl font-extrabold text-slate-100 tracking-wide md:text-3xl">
          Welcome to <span class="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent">Quacky Talk</span>
        </h1>
        
        <p class="text-xs md:text-sm text-slate-400 mt-4 leading-relaxed font-medium splash-desc">
          Hello, <span class="text-amber-400 font-bold">{{ currentUser().username }}</span>! Your bill is active and ready to quack. Choose a chat room from the top navigation bar to dive right into the water!
        </p>

        <!-- Guide Alert -->
        <div class="mt-8 p-3 rounded-xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm text-xs text-slate-500 flex items-center gap-3 alert-tip">
          <i class="bi bi-info-circle text-amber-500 text-base"></i>
          <span class="text-left leading-normal font-semibold">
            Tip: Type messages to other ducks to get real-time quick quack responses! Use Settings to change your duck avatar.
          </span>
        </div>

      </div>
    </div>
  `
})
export class WelcomeSplashComponent {
  chatService = inject(ChatService);
  currentUser = this.chatService.currentUser;
}
