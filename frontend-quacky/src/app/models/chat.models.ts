export interface Member {
  name: string;
  role: string;
  avatar: string;
  status: string;
}

export interface SharedFile {
  name: string;
  size: string;
  icon: string;
}

export interface Message {
  sender: string;
  senderAvatar: string;
  content: string;
  time: string;
  isSelf: boolean;
}

export interface Chat {
  id: number;
  name: string;
  avatar: string;
  isGroup: boolean;
  status: string;
  members: Member[];
  sharedImages: string[];
  sharedFiles: SharedFile[];
  messages: Message[];
}
