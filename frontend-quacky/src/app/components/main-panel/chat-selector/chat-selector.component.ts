import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-chat-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="w-full h-24 bg-slate-900/40 border-b border-slate-800/50 backdrop-blur-md flex items-center px-6 gap-6 overflow-x-auto shrink-0 select-none custom-scrollbar">
      
      <span class="text-xs font-bold text-amber-500/60 uppercase tracking-widest pointer-events-none sticky left-0 mr-2 bg-slate-950/10 px-2 py-1 rounded backdrop-blur">
        Pond Chats
      </span>

      <div class="flex flex-row items-center gap-6">
        @for (chat of chats(); track chat.id) {
          <button 
            (click)="chatService.selectChat(chat.id)"
            class="flex flex-col items-center gap-1.5 focus:outline-none group relative cursor-pointer"
          >
            <!-- Bubble Avatar Container -->
            <div class="relative">
              <div 
                class="w-12 h-12 rounded-full overflow-hidden p-[2px] transition-all duration-300 transform group-hover:scale-105 shadow-md bg-slate-800"
                [ngClass]="selectedChatId() === chat.id 
                  ? 'border-2 border-amber-500 ring-4 ring-amber-500/10 scale-105' 
                  : 'border-2 border-slate-700/80 group-hover:border-slate-500'"
              >
                <img class="w-full h-full rounded-full object-cover" [src]="chat.avatar" [alt]="chat.name">
              </div>

              <!-- Message Badge Count / status bubble -->
              @if (chat.id === 1 && selectedChatId() !== 1) {
                <span class="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-black text-slate-950 animate-bounce">
                  3
                </span>
              }
            </div>

            <!-- Chat Name -->
            <span 
              class="text-[10px] font-bold tracking-wide transition-colors duration-250 truncate max-w-[80px]"
              [ngClass]="selectedChatId() === chat.id ? 'text-amber-400 font-extrabold' : 'text-slate-400 group-hover:text-slate-200'"
            >
              {{ chat.name }}
            </span>
          </button>
        }

        <!-- Add New Chat Trigger Button inside horizontal row -->
        <button 
          (click)="chatService.openAddChat()"
          class="flex flex-col items-center gap-1.5 focus:outline-none group cursor-pointer"
          title="Create New Pond Chat"
        >
          <div class="w-12 h-12 rounded-full overflow-hidden p-[2px] border-2 border-dashed border-slate-700 group-hover:border-amber-500/80 group-hover:bg-amber-500/5 flex items-center justify-center transition-all duration-300 bg-slate-900/40 shadow-sm">
            <i class="bi bi-plus-lg text-slate-400 group-hover:text-amber-400 text-lg font-black transition-colors duration-250"></i>
          </div>
          <span class="text-[10px] font-bold tracking-wide text-slate-500 group-hover:text-amber-400 transition-colors duration-250">
            Add Pond
          </span>
        </button>
      </div>
    </header>
  `
})
export class ChatSelectorComponent {
  chatService = inject(ChatService);
  chats = this.chatService.chats;
  selectedChatId = this.chatService.selectedChatId;
}
