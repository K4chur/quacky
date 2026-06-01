import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../services/chat.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { ChatDetailsComponent } from '../chat-details/chat-details.component';
import { ChatSelectorComponent } from '../chat-selector/chat-selector.component';
import { ChatViewComponent } from '../chat-view/chat-view.component';
import { WelcomeSplashComponent } from '../welcome-splash/welcome-splash.component';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';
import { AddChatModalComponent } from '../add-chat-modal/add-chat-modal.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    CommonModule,
    UserProfileComponent,
    ChatDetailsComponent,
    ChatSelectorComponent,
    ChatViewComponent,
    WelcomeSplashComponent,
    SettingsModalComponent,
    AddChatModalComponent
  ],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel {
  chatService = inject(ChatService);
  isLightTheme = this.chatService.isLightTheme;
  selectedChatId = this.chatService.selectedChatId;
}
