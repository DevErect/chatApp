import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../services/socket.service';
import { AuthService } from '../../services/auth.service';
import { format } from 'date-fns';

interface User {
  username: string;
  lastMessage?: string;
} 

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer', { static: false }) messagesContainer!: ElementRef;
  @ViewChild('messageInput', { static: false }) messageInput!: ElementRef;
  
  username = '';
  recipient = '';
  message = '';
  messages: any[] = [];
  loggedIn = false;
  users: User[] = [];
  private shouldScrollToBottom = false;
  isSidebarCollapsed = false;
  showEmojiPicker = false;

  popularEmojis = [
    '😀', '😂', '🥰', '😍', '🤔', '😭', '😡', '👍', '👎', '❤️',
    '🔥', '💯', '✨', '🎉', '🙌', '👏', '🤝', '💪', '🙏', '👋',
    '😊', '😎', '🤗', '😴', '🤯', '😱', '🥳', '😇', '🤪', '🙄'
  ];

  constructor(
    private socketService: SocketService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initializeUser();
    this.socketService.messages$.subscribe((msgs) => {
      const previousMessageCount = this.messages.length;
      this.messages = msgs;
      if (msgs.length > previousMessageCount) {
        this.shouldScrollToBottom = true;
      }
      this.updateUsersWithLastMessages();
    });
    this.socketService.lastMessage$.subscribe((data: { user: string; message: string }) => {
      const userToUpdate = this.users.find(u => u.username === data.user);
      if (userToUpdate) {
        userToUpdate.lastMessage = data.message;
      }
    });
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        const element = this.messagesContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  initializeUser() {
    this.authService.fetchUserData()?.subscribe({
      next: (response: any) => {
        if (response?.user) {
          this.username = response.user.username;
          this.socketService.login(this.username);
          this.loggedIn = true;
          this.loadUsers();
        }
      },
      error: (err: any) => console.error('Failed to get username:', err),
    });
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res.users
          .filter((u: any) => u.username !== this.username)
          .map((u: any) => ({ username: u.username }));
        this.users.forEach(user => {
          this.socketService.requestLastMessageWith(user.username);
        });
      },
      error: (err) => console.error('Failed to load users from DB:', err),
    });
  }

  updateUsersWithLastMessages() {
    this.users = this.users.map((user) => {
      const lastMsg = [...this.messages]
        .filter(
          (msg) =>
            (msg.sender === user.username && msg.recipient === this.username) ||
            (msg.recipient === user.username && msg.sender === this.username)
        )
        .pop();
      return {
        ...user,
        lastMessage: lastMsg ? lastMsg.message : user.lastMessage || '',
      };
    });
  }

  send() {
    if (this.message.trim() && this.recipient.trim()) {
      this.socketService.sendMessage(
        this.recipient.trim(),
        this.message.trim()
      );
      this.message = '';
      this.shouldScrollToBottom = true;
      this.showEmojiPicker = false; 
    }
  }

  loadChat() {
    if (this.recipient.trim()) {
      this.socketService.loadChatWith(this.recipient.trim());
      this.shouldScrollToBottom = true;
    }
  }

  startChatWith(user: string) {
    this.recipient = user;
    this.loadChat();
    
    if (this.isMobileView()) {
      this.isSidebarCollapsed = true;
    }
  }

  formatTimestamp(timestamp: string): string {
    return format(new Date(timestamp), 'p');
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  isMobileView(): boolean {
    return window.innerWidth < 640; 
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(emoji: string) {
    this.message += emoji;
    if (this.messageInput) {
      this.messageInput.nativeElement.focus();
    }
  }

  closeEmojiPicker() {
    this.showEmojiPicker = false;
  }
}