import { Injectable, signal, computed } from '@angular/core';
import { Chat, Member, Message } from '../models/chat.models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  // User profile
  private _currentUser = signal({
    username: 'Sir Quacks-a-Lot',
    status: 'Coding like a duck 🦆',
    avatar: 'assets/profilePictures/ducky_quacky_avatar_default.png',
  });

  currentUser = this._currentUser.asReadonly();

  // Theme state
  isLightTheme = signal(false);

  // Modal states
  isAddChatOpen = signal(false);
  isSettingsOpen = signal(false);

  // App Selection States
  selectedChatId = signal<number | null>(null);

  // Mock Chats Data
  chats = signal<Chat[]>([
    {
      id: 1,
      name: 'Ducky Dev Team',
      avatar: 'assets/profilePictures/ducky_quacky_avatar_senior.png',
      isGroup: true,
      status: 'Squashing bugs and eating breadcrumbs 🥖',
      members: [
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
          name: 'Sir Quacks-a-Lot',
          role: 'You (Junior)',
          avatar: 'assets/profilePictures/ducky_quacky_avatar_default.png',
          status: 'online',
        },
      ],
      sharedImages: [
        'assets/profilePictures/ducky_quacky_avatar_senior.png',
        'assets/profilePictures/ducky_quacky_avatar_sunglasses.png',
        'assets/profilePictures/ducky_quacky_avatar_cowboy.png',
        'assets/profilePictures/ducky_quacky_avatar_default.png',
      ],
      sharedFiles: [
        { name: 'roadmap_2026_q2.pdf', size: '1.4 MB', icon: 'bi-file-earmark-pdf' },
        { name: 'quack_specs_v3.docx', size: '542 KB', icon: 'bi-file-earmark-word' },
        { name: 'duck_pond_blueprints.zip', size: '12.8 MB', icon: 'bi-file-earmark-zip' },
      ],
      messages: [
        {
          sender: 'Senior Ducky',
          senderAvatar: 'assets/profilePictures/ducky_quacky_avatar_senior.png',
          content: 'Hey team, did we fix the floating point issue in the pond navigation system?',
          time: '10:15 AM',
          isSelf: false,
        },
        {
          sender: 'Cowboy Ducky',
          senderAvatar: 'assets/profilePictures/ducky_quacky_avatar_cowboy.png',
          content: "I'm on it! Just need a few more worms for energy.",
          time: '10:18 AM',
          isSelf: false,
        },
        {
          sender: 'Sunny Ducky',
          senderAvatar: 'assets/profilePictures/ducky_quacky_avatar_sunglasses.png',
          content: 'UI looks amazing, I added a glassmorphism lake effect.',
          time: '10:20 AM',
          isSelf: false,
        },
        {
          sender: 'Sir Quacks-a-Lot',
          senderAvatar: 'assets/profilePictures/ducky_quacky_avatar_default.png',
          content: "Great job team! Let's get this quacked!",
          time: '10:22 AM',
          isSelf: true,
        },
      ],
    },
    {
      id: 2,
      name: 'Wild West Quackers',
      avatar: 'assets/profilePictures/ducky_quacky_avatar_cowboy.png',
      isGroup: true,
      status: 'Fastest quack in the West 🤠',
      members: [
        {
          name: 'Cowboy Ducky',
          role: 'Sheriff',
          avatar: 'assets/profilePictures/ducky_quacky_avatar_cowboy.png',
          status: 'online',
        },
        {
          name: 'Outlaw Ducky',
          role: 'Drifter',
          avatar: 'assets/profilePictures/ducky_quacky_avatar_smoker.png',
          status: 'away',
        },
        {
          name: 'Sir Quacks-a-Lot',
          role: 'Deputy',
          avatar: 'assets/profilePictures/ducky_quacky_avatar_default.png',
          status: 'online',
        },
      ],
      sharedImages: [
        'assets/profilePictures/ducky_quacky_avatar_cowboy.png',
        'assets/profilePictures/ducky_quacky_avatar_smoker.png',
      ],
      sharedFiles: [
        { name: 'wanted_poster.png', size: '3.2 MB', icon: 'bi-image' },
        { name: 'bounty_split_calc.xlsx', size: '45 KB', icon: 'bi-file-earmark-excel' },
      ],
      messages: [
        {
          sender: 'Outlaw Ducky',
          senderAvatar: 'assets/profilePictures/ducky_quacky_avatar_smoker.png',
          content: "This pond ain't big enough for the two of us...",
          time: 'Yesterday',
          isSelf: false,
        },
        {
          sender: 'Cowboy Ducky',
          senderAvatar: 'assets/profilePictures/ducky_quacky_avatar_cowboy.png',
          content: "Then you'd better start paddle-boarding, partner!",
          time: 'Yesterday',
          isSelf: false,
        },
        {
          sender: 'Sir Quacks-a-Lot',
          senderAvatar: 'assets/profilePictures/ducky_quacky_avatar_default.png',
          content: "Let's keep the peace, y'all.",
          time: '9:00 AM',
          isSelf: true,
        },
      ],
    },
    {
      id: 3,
      name: 'Professor Monocle',
      avatar: 'assets/profilePictures/ducky_quacky_avatar_monocle.png',
      isGroup: false,
      status: 'Indubitably studying fluid dynamics of quacking 🧐',
      members: [
        {
          name: 'Professor Monocle',
          role: 'Scientist',
          avatar: 'assets/profilePictures/ducky_quacky_avatar_monocle.png',
          status: 'online',
        },
        {
          name: 'Sir Quacks-a-Lot',
          role: 'Observer',
          avatar: 'assets/profilePictures/ducky_quacky_avatar_default.png',
          status: 'online',
        },
      ],
      sharedImages: ['assets/profilePictures/ducky_quacky_avatar_monocle.png'],
      sharedFiles: [
        { name: 'quantum_quacking_thesis.pdf', size: '8.9 MB', icon: 'bi-file-earmark-pdf' },
      ],
      messages: [
        {
          sender: 'Professor Monocle',
          senderAvatar: 'assets/profilePictures/ducky_quacky_avatar_monocle.png',
          content: 'Greetings. I have analyzed the velocity of your latest soundwave.',
          time: '11:02 AM',
          isSelf: false,
        },
        {
          sender: 'Sir Quacks-a-Lot',
          senderAvatar: 'assets/profilePictures/ducky_quacky_avatar_default.png',
          content: 'Fascinating! What did you find, Professor?',
          time: '11:05 AM',
          isSelf: true,
        },
        {
          sender: 'Professor Monocle',
          senderAvatar: 'assets/profilePictures/ducky_quacky_avatar_monocle.png',
          content: 'It travels 12% faster when breadcrumbs are nearby.',
          time: '11:06 AM',
          isSelf: false,
        },
      ],
    },
    {
      id: 4,
      name: 'Outlaw Ducky',
      avatar: 'assets/profilePictures/ducky_quacky_avatar_smoker.png',
      isGroup: false,
      status: 'Living on the edge of the pond 🚬',
      members: [
        {
          name: 'Outlaw Ducky',
          role: 'Outlaw',
          avatar: 'assets/profilePictures/ducky_quacky_avatar_smoker.png',
          status: 'offline',
        },
        {
          name: 'Sir Quacks-a-Lot',
          role: 'Deputy',
          avatar: 'assets/profilePictures/ducky_quacky_avatar_default.png',
          status: 'online',
        },
      ],
      sharedImages: ['assets/profilePictures/ducky_quacky_avatar_smoker.png'],
      sharedFiles: [
        { name: 'secret_stash_coordinates.txt', size: '1 KB', icon: 'bi-file-earmark-text' },
      ],
      messages: [
        {
          sender: 'Outlaw Ducky',
          senderAvatar: 'assets/profilePictures/ducky_quacky_avatar_smoker.png',
          content: "Got any spare bread? I'm dry.",
          time: 'Friday',
          isSelf: false,
        },
        {
          sender: 'Sir Quacks-a-Lot',
          senderAvatar: 'assets/profilePictures/ducky_quacky_avatar_default.png',
          content: "I'll see what I can smuggle from the bakery.",
          time: 'Friday',
          isSelf: true,
        },
      ],
    },
    {
      id: 5,
      name: 'Sunny Ducky',
      avatar: 'assets/profilePictures/ducky_quacky_avatar_sunglasses.png',
      isGroup: false,
      status: 'Just chilling in the sun ☀️🕶️',
      members: [
        {
          name: 'Sunny Ducky',
          role: 'Surfer',
          avatar: 'assets/profilePictures/ducky_quacky_avatar_sunglasses.png',
          status: 'online',
        },
        {
          name: 'Sir Quacks-a-Lot',
          role: 'Friend',
          avatar: 'assets/profilePictures/ducky_quacky_avatar_default.png',
          status: 'online',
        },
      ],
      sharedImages: ['assets/profilePictures/ducky_quacky_avatar_sunglasses.png'],
      sharedFiles: [{ name: 'beach_mix_2026.mp3', size: '45 MB', icon: 'bi-file-earmark-music' }],
      messages: [
        {
          sender: 'Sunny Ducky',
          senderAvatar: 'assets/profilePictures/ducky_quacky_avatar_sunglasses.png',
          content: 'Water is perfect today! Come down!',
          time: 'Saturday',
          isSelf: false,
        },
        {
          sender: 'Sir Quacks-a-Lot',
          senderAvatar: 'assets/profilePictures/ducky_quacky_avatar_default.png',
          content: 'Be there in 5, just finishing some CSS alignment!',
          time: 'Saturday',
          isSelf: true,
        },
      ],
    },
  ]);

  selectedChat = computed(() => {
    const id = this.selectedChatId();
    return this.chats().find((c) => c.id === id);
  });

  toggleTheme() {
    this.isLightTheme.update((v) => !v);
  }

  selectChat(id: number) {
    this.selectedChatId.set(id);
  }

  deselectChat() {
    this.selectedChatId.set(null);
  }

  openSettings() {
    this.isSettingsOpen.set(true);
  }

  closeSettings() {
    this.isSettingsOpen.set(false);
  }

  openAddChat() {
    this.isAddChatOpen.set(true);
  }

  closeAddChat() {
    this.isAddChatOpen.set(false);
  }

  saveSettings(username: string, status: string, avatar: string) {
    const oldName = this._currentUser().username;
    this._currentUser.set({
      username: username.trim(),
      status: status.trim() || 'Active and Quacking 🦆',
      avatar: avatar,
    });

    this.chats.update((allChats) => {
      return allChats.map((chat) => {
        const updatedMembers = chat.members.map((member) => {
          if (
            member.name === oldName ||
            [
              'You (Junior)',
              'Deputy',
              'You',
              'Observer',
              'Friend',
              'You (Creator)',
            ].includes(member.role)
          ) {
            return { ...member, name: username, avatar: avatar };
          }
          return member;
        });

        const updatedMessages = chat.messages.map((msg) => {
          if (msg.isSelf) {
            return { ...msg, sender: username, senderAvatar: avatar };
          }
          return msg;
        });

        return {
          ...chat,
          members: updatedMembers,
          messages: updatedMessages,
        };
      });
    });

    this.closeSettings();
  }

  sendMessage(content: string) {
    const id = this.selectedChatId();
    if (!content.trim() || id === null) return;

    this.chats.update((allChats) => {
      return allChats.map((chat) => {
        if (chat.id === id) {
          const newMessage: Message = {
            sender: this._currentUser().username,
            senderAvatar: this._currentUser().avatar,
            content: content.trim(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSelf: true,
          };
          
          setTimeout(() => {
            this.triggerMockReply(id, content.trim());
          }, 1200);

          return {
            ...chat,
            messages: [...chat.messages, newMessage],
          };
        }
        return chat;
      });
    });
  }

  private triggerMockReply(chatId: number, userText: string) {
    if (this.selectedChatId() !== chatId) return;

    this.chats.update((allChats) => {
      return allChats.map((chat) => {
        if (chat.id === chatId) {
          const otherMembers = chat.members.filter(
            (m) => m.name !== this._currentUser().username
          );
          if (otherMembers.length === 0) return chat;

          const responder = otherMembers[Math.floor(Math.random() * otherMembers.length)];

          let reply = 'Quack! 🦆';
          if (chat.id === 1) {
            const replies = [
              "Quack! Sounds like a plan. Let's merge it! 🚀",
              'Did someone say breadcrumbs? 🥖 My code compiler runs on breadcrumbs!',
              'Excellent points. Sunglasses Ducky, can you verify the CSS transitions? ✨',
              'Worms successfully wrangled. Database performance increased by 40%! 🪱',
            ];
            reply = replies[Math.floor(Math.random() * replies.length)];
          } else if (chat.id === 2) {
            const replies = [
              'Draw your quackers, partner! 🤠🔫',
              "Don't push your luck, deputy... *puffs wild-west seaweed cigar* 🚬",
              'At high noon, we feast on sourdough bread! 🥖🏜️',
            ];
            reply = replies[Math.floor(Math.random() * replies.length)];
          } else if (chat.id === 3) {
            const replies = [
              'Splendid! The physics calculations perfectly match your logic. 🧐🔬',
              'According to my aerodynamic feathers, that is 100% correct.',
              'Let us formulate a scientific thesis on this quack. 📚🦆',
            ];
            reply = replies[Math.floor(Math.random() * replies.length)];
          } else if (chat.id === 4) {
            const replies = [
              'Keep it on the down-low, the sheriff (Cowboy Ducky) is watching... 🤫',
              'Meet me behind the cattails at sunset. Bring the breadcrumbs. 🥖💨',
            ];
            reply = replies[Math.floor(Math.random() * replies.length)];
          } else if (chat.id === 5) {
            const replies = [
              'Totally epic, dude! 🌊🌴 Let the sunshine in!',
              'No stress, just floating around. Life is good! ☀️🏖️',
              'Tubular quacks all day! 🕶️✨',
            ];
            reply = replies[Math.floor(Math.random() * replies.length)];
          } else {
            const replies = [
              'Quack! Highly interesting discussion here. 🦆',
              'I am absolutely swimming in this conversation! 🌊',
              'Count me in! Let us do this together.',
              'Did someone say breadcrumbs? 🥖 Yum!',
            ];
            reply = replies[Math.floor(Math.random() * replies.length)];
          }

          const mockMessage: Message = {
            sender: responder.name,
            senderAvatar: responder.avatar,
            content: reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSelf: false,
          };

          return {
            ...chat,
            messages: [...chat.messages, mockMessage],
          };
        }
        return chat;
      });
    });
  }

  addChat(newChat: Chat) {
    this.chats.update((allChats) => [...allChats, newChat]);
    this.selectChat(newChat.id);
    this.closeAddChat();
  }
}
