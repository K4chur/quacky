import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-chat-details',
  standalone: true,
  imports: [CommonModule],
  host: { 'class': 'flex-1 flex flex-col overflow-hidden' },
  template: `
    <div class="flex-1 flex flex-col overflow-hidden bg-slate-950/20">
      @if (selectedChat(); as chat) {
        <!-- Chat Detail: Active State -->
        <div class="flex-1 flex flex-col overflow-hidden animate-fade-in">
          
          <!-- Selected Chat Header Detail -->
          <div class="p-5 flex flex-col items-center border-b border-slate-800/50 bg-slate-900/30">
            <div class="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-700/50 p-0.5 bg-slate-800 mb-3 shadow-lg">
              <img class="w-full h-full rounded-full object-cover" [src]="chat.avatar" [alt]="chat.name">
            </div>
            <h3 class="text-base font-bold text-slate-100 text-center tracking-wide line-clamp-1">{{ chat.name }}</h3>
            <p class="text-xs text-slate-400 mt-1 text-center font-medium line-clamp-2 px-4 italic">
              "{{ chat.status }}"
            </p>
          </div>

          <!-- Tabs Header -->
          <div class="flex border-b border-slate-800/80 bg-slate-900/20 text-xs font-semibold select-none">
            <!-- Members tab (only shown if it is group chat) -->
            @if (chat.isGroup) {
              <button 
                (click)="selectedTab.set('members')"
                class="flex-1 py-3 text-center transition-all duration-300 cursor-pointer"
                [ngClass]="selectedTab() === 'members' ? 'text-amber-400 border-b-2 border-amber-500 bg-slate-900/40' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/10'"
              >
                Members ({{ chat.members.length }})
              </button>
            }
            
            <button 
              (click)="selectedTab.set('images')"
              class="flex-1 py-3 text-center transition-all duration-300 cursor-pointer"
              [ngClass]="selectedTab() === 'images' ? 'text-amber-400 border-b-2 border-amber-500 bg-slate-900/40' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/10'"
            >
              Images
            </button>
            
            <button 
              (click)="selectedTab.set('files')"
              class="flex-1 py-3 text-center transition-all duration-300 cursor-pointer"
              [ngClass]="selectedTab() === 'files' ? 'text-amber-400 border-b-2 border-amber-500 bg-slate-900/40' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/10'"
            >
              Files
            </button>
          </div>

          <!-- Tabs Content (Scrollable) -->
          <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
            
            <!-- MEMBERS LIST TAB -->
            @if (selectedTab() === 'members' && chat.isGroup) {
              <div class="space-y-3">
                @for (member of chat.members; track member.name) {
                  <div class="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/40 transition-colors duration-250 border border-transparent hover:border-slate-800/40">
                    <div class="relative shrink-0">
                      <img class="w-9 h-9 rounded-full object-cover" [src]="member.avatar" [alt]="member.name">
                      <span 
                        class="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-slate-900"
                        [ngClass]="member.status === 'online' ? 'bg-emerald-500' : member.status === 'away' ? 'bg-amber-500' : 'bg-slate-500'"
                      ></span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <h4 class="text-xs font-bold text-slate-200 truncate">{{ member.name }}</h4>
                      <p class="text-[10px] text-slate-400 mt-0.5 truncate">{{ member.role }}</p>
                    </div>
                  </div>
                }
              </div>
            }

            <!-- SHARED IMAGES GRID TAB -->
            @if (selectedTab() === 'images') {
              <div>
                @if (chat.sharedImages.length > 0) {
                  <div class="grid grid-cols-2 gap-2">
                    @for (img of chat.sharedImages; track $index) {
                      <div class="aspect-square rounded-xl overflow-hidden border border-slate-850 hover:border-amber-500/40 group relative cursor-pointer bg-slate-900 shadow-sm transition-all duration-300">
                        <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" [src]="img" alt="shared-image">
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <i class="bi bi-eye text-white text-lg"></i>
                        </div>
                      </div>
                    }
                  </div>
                } @else {
                  <div class="flex flex-col items-center justify-center py-8 text-center text-slate-500">
                    <i class="bi bi-images text-2xl mb-2 opacity-50"></i>
                    <p class="text-xs">No shared images yet</p>
                  </div>
                }
              </div>
            }

            <!-- SHARED FILES LIST TAB -->
            @if (selectedTab() === 'files') {
              <div class="space-y-2">
                @if (chat.sharedFiles.length > 0) {
                  @for (file of chat.sharedFiles; track file.name) {
                    <div class="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/40 hover:border-amber-500/30 hover:bg-slate-800/30 transition-all duration-200 group cursor-pointer">
                      <div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 text-lg group-hover:bg-amber-500/20 transition-all duration-200">
                        <i [ngClass]="file.icon ? file.icon : 'bi-file-earmark'"></i>
                      </div>
                      <div class="flex-1 min-w-0">
                        <h4 class="text-xs font-bold text-slate-200 truncate group-hover:text-amber-400 transition-colors duration-200" [title]="file.name">{{ file.name }}</h4>
                        <p class="text-[10px] text-slate-400 mt-0.5">{{ file.size }}</p>
                      </div>
                      <button class="text-slate-400 hover:text-slate-100 cursor-pointer" title="Download">
                        <i class="bi bi-download"></i>
                      </button>
                    </div>
                  }
                } @else {
                  <div class="flex flex-col items-center justify-center py-8 text-center text-slate-500">
                    <i class="bi bi-file-earmark-text text-2xl mb-2 opacity-50"></i>
                    <p class="text-xs">No shared files yet</p>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Close Active Chat Button -->
          <div class="p-3 border-t border-slate-850/60 bg-slate-950/20">
            <button 
              (click)="chatService.deselectChat()"
              class="w-full py-2 flex items-center justify-center gap-2 rounded-xl bg-slate-800/30 hover:bg-slate-800/60 text-slate-300 hover:text-slate-100 border border-slate-700/30 text-xs font-semibold cursor-pointer transition-all duration-200"
            >
              <i class="bi bi-arrow-left"></i> Deselect Chat
            </button>
          </div>
        </div>

      } @else {
        <!-- Chat Detail: Empty State -->
        <div class="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-500 animate-pulse-slow">
          <div class="w-16 h-16 rounded-full bg-slate-900/60 border border-slate-800 flex items-center justify-center mb-4 text-amber-500/30 shadow-inner">
            <i class="bi bi-chat-dots-fill text-2xl"></i>
          </div>
          <h4 class="text-sm font-bold text-slate-400 tracking-wide">Select Chat For Info</h4>
          <p class="text-xs text-slate-500 mt-2 max-w-[200px] leading-relaxed">
            Click on any duck's bubble at the top of the main panel to view shared content and details.
          </p>
        </div>
      }
    </div>
  `
})
export class ChatDetailsComponent {
  chatService = inject(ChatService);
  selectedChat = this.chatService.selectedChat;
  selectedTab = signal('members');

  constructor() {
    effect(() => {
      const chat = this.selectedChat();
      if (chat) {
        this.selectedTab.set(chat.isGroup ? 'members' : 'images');
      }
    });
  }
}
