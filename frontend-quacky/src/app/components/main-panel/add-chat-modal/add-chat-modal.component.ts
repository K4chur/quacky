import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chat.service';
import { Chat, Member } from '../../../models/chat.models';

@Component({
  selector: 'app-add-chat-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (chatService.isAddChatOpen()) {
      <div class="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm animate-fade-in">
        
        <!-- Modal Card Box -->
        <div class="bg-slate-900/95 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative mx-4 animate-scale-up modal-card">
          
          <!-- Close X Button -->
          <button 
            (click)="chatService.closeAddChat()"
            class="absolute top-4 right-4 text-slate-400 hover:text-slate-100 cursor-pointer transition-colors"
          >
            <i class="bi bi-x-lg text-lg"></i>
          </button>

          <!-- Modal Title -->
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 text-xl border border-amber-500/20">
              <i class="bi bi-plus-circle-fill"></i>
            </div>
            <div>
              <h2 class="text-lg font-black text-slate-100 tracking-wide modal-title">Create New Pond</h2>
              <p class="text-[10px] text-slate-400 mt-0.5">Invite ducks to a brand new swimming room</p>
            </div>
          </div>

          <!-- Add Chat Content -->
          <div class="space-y-5">
            
            <!-- Pond Name input -->
            <div>
              <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 select-label" for="pond-name-input">Pond Name</label>
              <input 
                type="text" 
                id="pond-name-input"
                [(ngModel)]="newChatName"
                placeholder="e.g. Breadcrumb Feast Group"
                maxlength="25"
                class="w-full h-10 px-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 text-xs md:text-sm font-semibold outline-none transition-all input-field"
              >
            </div>

            <!-- Chat Type Toggle (Group vs Direct) -->
            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/30 border border-slate-850/60 select-label border-style">
              <div>
                <span class="block text-xs font-bold text-slate-200">Force Group Chat Mode</span>
                <span class="block text-[10px] text-slate-500 mt-0.5">Enables multiple tabs (Members list)</span>
              </div>
              <button 
                (click)="newChatIsGroup.set(!newChatIsGroup())"
                type="button"
                class="w-11 h-6 rounded-full p-1 cursor-pointer transition-all duration-300 relative border-style bg-toggle"
                [ngClass]="newChatIsGroup() ? 'bg-amber-500' : 'bg-slate-800'"
              >
                <span 
                  class="block h-4 w-4 rounded-full transition-all duration-300 transform bg-slate-950 shadow"
                  [ngClass]="newChatIsGroup() ? 'translate-x-5' : 'translate-x-0 bg-slate-400'"
                ></span>
              </button>
            </div>

            <!-- Invite Members Checklist -->
            <div>
              <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 select-label">Invite Ducks to Pond</label>
              <div class="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                @for (contact of availableNewChatMembers; track contact.name) {
                  <div 
                    (click)="toggleMemberSelection(contact.name)"
                    class="flex items-center justify-between p-2 rounded-xl border cursor-pointer select-none transition-all duration-200 contact-invite-row"
                    [ngClass]="selectedMemberNames()[contact.name]
                      ? 'bg-amber-500/5 border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.05)]' 
                      : 'bg-slate-900/20 border-slate-850/60 hover:bg-slate-800/20 hover:border-slate-800'"
                  >
                    <div class="flex items-center gap-3">
                      <img class="w-8 h-8 rounded-full object-cover bg-slate-850 border border-slate-800 contact-avatar" [src]="contact.avatar" [alt]="contact.name">
                      <div>
                        <h4 class="text-xs font-bold text-slate-200 contact-name">{{ contact.name }}</h4>
                        <p class="text-[9px] text-slate-500 mt-0.5">{{ contact.role }}</p>
                      </div>
                    </div>
                    
                    <!-- Checkbox -->
                    <div 
                      class="w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 checkbox-box"
                      [ngClass]="selectedMemberNames()[contact.name]
                        ? 'bg-amber-500 text-slate-950 text-xs font-black shadow' 
                        : 'border border-slate-700'"
                    >
                      @if (selectedMemberNames()[contact.name]) {
                        <i class="bi bi-check-lg"></i>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>

          </div>

          <!-- Modal Action Footer Buttons -->
          <div class="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-800/80">
            <button 
              (click)="chatService.closeAddChat()"
              class="px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-xs font-bold cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button 
              (click)="createChat()"
              [disabled]="!newChatName().trim()"
              class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 text-xs font-black shadow-md cursor-pointer transition-all duration-200"
              [ngClass]="!newChatName().trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-103 active:scale-97'"
            >
              Create Pond
            </button>
          </div>

        </div>
      </div>
    }
  `
})
export class AddChatModalComponent {
  chatService = inject(ChatService);
  
  newChatName = signal('');
  newChatIsGroup = signal(false);
  selectedMemberNames = signal<{ [name: string]: boolean }>({});

  availableNewChatMembers = [
    {
      name: 'Senior Ducky',
      role: 'Tech Lead',
      avatar: 'assets/profilePictures/ducky_quacky_avatar_senior.png',
      status: 'online',
    },
    {
      name: 'Sunny Ducky',
      role: 'UI Architect',
      avatar: 'assets/profilePictures/ducky_quacky_avatar_sunglasses.png',
      status: 'online',
    },
    {
      name: 'Cowboy Ducky',
      role: 'DB Wrangling',
      avatar: 'assets/profilePictures/ducky_quacky_avatar_cowboy.png',
      status: 'offline',
    },
    {
      name: 'Professor Monocle',
      role: 'Scientist',
      avatar: 'assets/profilePictures/ducky_quacky_avatar_monocle.png',
      status: 'online',
    },
    {
      name: 'Outlaw Ducky',
      role: 'Outlaw',
      avatar: 'assets/profilePictures/ducky_quacky_avatar_smoker.png',
      status: 'offline',
    },
  ];

  toggleMemberSelection(memberName: string) {
    this.selectedMemberNames.update(names => ({
      ...names,
      [memberName]: !names[memberName]
    }));
  }

  createChat() {
    if (!this.newChatName().trim()) return;

    const user = this.chatService.currentUser();
    const selectedMembers = this.availableNewChatMembers.filter(
      (m) => this.selectedMemberNames()[m.name],
    );

    const activeMembers: Member[] = [
      ...selectedMembers,
      { name: user.username, role: 'You (Creator)', avatar: user.avatar, status: 'online' },
    ];

    let chatAvatar = 'assets/profilePictures/ducky_quacky_avatar_default.png';
    if (selectedMembers.length > 0) {
      chatAvatar = selectedMembers[0].avatar;
    }

    const chats = this.chatService.chats();
    const newChatId = chats.length > 0 ? Math.max(...chats.map((c: Chat) => c.id)) + 1 : 1;

    const newChat: Chat = {
      id: newChatId,
      name: this.newChatName().trim(),
      avatar: chatAvatar,
      isGroup: this.newChatIsGroup() || selectedMembers.length > 1,
      status: this.newChatIsGroup() || selectedMembers.length > 1
        ? 'A brand new flock has gathered! 🌊'
        : `Direct quack conversation with ${selectedMembers[0]?.name || 'Ducky'}`,
      members: activeMembers,
      sharedImages: selectedMembers.map((m) => m.avatar),
      sharedFiles: [
        { name: 'welcome_pond_manual.pdf', size: '120 KB', icon: 'bi-file-earmark-pdf' },
      ],
      messages: [
        {
          sender: 'System Ducky',
          senderAvatar: 'assets/common/ducky_quacky.svg',
          content: `Pond successfully created! Welcome to the new quacking room: "${this.newChatName().trim()}"! 🌊🦆`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSelf: false,
        },
      ],
    };

    this.chatService.addChat(newChat);
    
    // Reset local state
    this.newChatName.set('');
    this.newChatIsGroup.set(false);
    this.selectedMemberNames.set({});
  }
}
