import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-chat-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  host: { 'class': 'flex-1 flex flex-col overflow-hidden' },
  template: `
    @if (selectedChat(); as chat) {
      <!-- Dynamic Chat Display -->
      <div class="flex-1 flex flex-col overflow-hidden bg-slate-900/10 animate-fade-in">
        
        <!-- Chat Title Sub-Bar -->
        <div class="px-6 py-3 border-b border-slate-800/40 bg-slate-950/20 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full overflow-hidden bg-slate-800 border border-slate-700/50">
              <img class="w-full h-full object-cover" [src]="chat.avatar" alt="active_avatar">
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-bold text-slate-100">{{ chat.name }}</h3>
                <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
              </div>
              <p class="text-[10px] text-slate-400 font-medium">
                @if (chat.isGroup) {
                  Group Chat ({{ chat.members.length }} ducks)
                } @else {
                  Direct Chat
                }
              </p>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors" title="Call">
              <i class="bi bi-telephone"></i>
            </button>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors" title="Video">
              <i class="bi bi-camera-video"></i>
            </button>
          </div>
        </div>

        <!-- Chat Messages Scroll Area -->
        <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar bg-slate-950/10" id="messages-container">
          @for (msg of chat.messages; track $index) {
            <div 
              class="flex items-end gap-3 max-w-[80%] animate-slide-up"
              [ngClass]="msg.isSelf ? 'ml-auto flex-row-reverse' : 'mr-auto'"
            >
              <!-- Message sender avatar -->
              <div class="shrink-0 w-8 h-8 rounded-full overflow-hidden border border-slate-700/60 shadow bg-slate-850">
                <img class="w-full h-full object-cover" [src]="msg.senderAvatar" [alt]="msg.sender">
              </div>

              <!-- Message bubble content -->
              <div class="flex flex-col gap-1">
                @if (!msg.isSelf) {
                  <span class="text-[10px] font-bold text-amber-500/80 px-1">{{ msg.sender }}</span>
                }
                <div 
                  class="px-4 py-2.5 rounded-2xl text-xs md:text-sm font-medium leading-relaxed shadow-sm border bubble-card"
                  [ngClass]="msg.isSelf 
                    ? 'bg-gradient-to-br from-amber-500 to-yellow-600 border-amber-400/20 text-slate-950 rounded-br-none shadow-[0_2px_8px_rgba(245,158,11,0.15)]' 
                    : 'bg-slate-800/80 border-slate-700/50 text-slate-100 rounded-bl-none'"
                >
                  {{ msg.content }}
                </div>
                <span class="text-[9px] text-slate-500 px-1 font-semibold self-end">
                  {{ msg.time }}
                </span>
              </div>
            </div>
          }
        </div>

        <!-- Message Input Area -->
        <footer class="p-4 border-t border-slate-800/60 bg-slate-900/30 backdrop-blur">
          <form (submit)="sendMessage(); $event.preventDefault();" class="flex items-center gap-3">
            
            <!-- Attachments Button -->
            <button 
              type="button" 
              class="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-slate-400 hover:text-slate-200 border border-slate-700/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Share Breadcrumb / Attach file"
            >
              <i class="bi bi-paperclip text-lg"></i>
            </button>

            <!-- Main Text Input -->
            <div class="flex-1 relative">
              <input 
                type="text" 
                name="newMessage"
                [(ngModel)]="newMessageContent"
                placeholder="Quack a message to the flock..."
                autocomplete="off"
                class="w-full h-11 pl-4 pr-12 rounded-xl bg-slate-950/60 text-slate-100 border border-slate-800 focus:border-amber-500/80 focus:ring-2 focus:ring-amber-500/10 placeholder-slate-500 text-xs md:text-sm font-medium outline-none transition-all duration-300 input-field"
              >
              
              <!-- Emojis Picker Mock Trigger -->
              <button 
                type="button"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                title="Insert emoji"
              >
                <i class="bi bi-emoji-smile text-lg"></i>
              </button>
            </div>

            <!-- Send Button -->
            <button 
              type="submit" 
              [disabled]="!newMessageContent.trim()"
              class="h-11 px-5 flex items-center justify-center gap-2 rounded-xl text-xs md:text-sm font-bold shadow-md cursor-pointer transition-all duration-300 focus:outline-none"
              [ngClass]="newMessageContent.trim()
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 hover:scale-103 active:scale-97 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]' 
                : 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed'"
            >
              <span>Quack</span>
              <i class="bi bi-send-fill text-xs"></i>
            </button>
          </form>
        </footer>

      </div>
    }
  `
})
export class ChatViewComponent {
  chatService = inject(ChatService);
  selectedChat = this.chatService.selectedChat;
  newMessageContent = '';

  sendMessage() {
    if (!this.newMessageContent.trim()) return;
    this.chatService.sendMessage(this.newMessageContent);
    this.newMessageContent = '';
    
    // Auto scroll to bottom (simplified mock)
    setTimeout(() => {
      const container = document.getElementById('messages-container');
      if (container) container.scrollTop = container.scrollHeight;
    }, 100);
  }
}
