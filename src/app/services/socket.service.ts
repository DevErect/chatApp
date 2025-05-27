// import { Injectable } from '@angular/core';
// import { io, Socket } from 'socket.io-client';
// import { Observable, BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class SocketService {
//   private socket: Socket;
//   private messagesSubject = new BehaviorSubject<any[]>([]);
//   messages$ = this.messagesSubject.asObservable();

//   private loggedInSubject = new BehaviorSubject<boolean>(false);
//   loggedIn$ = this.loggedInSubject.asObservable();

//   private usersSubject = new BehaviorSubject<string[]>([]);
//   users$ = this.usersSubject.asObservable();

//   private username: string = '';

//   constructor() {
//     this.socket = io('http://localhost:5000');

//     this.socket.on('privateMessage', (msg: any) => {
//       const currentMsgs = this.messagesSubject.value;
//       this.messagesSubject.next([...currentMsgs, msg]);
//     });

//     this.socket.on('loadMessages', (msgs: any[]) => {
//       this.messagesSubject.next(msgs);
//     });

//     this.socket.on('allMessages', (msgs: any[]) => {
//       this.messagesSubject.next(msgs);
//     });

//     this.socket.on('userList', (users: string[]) => {
//       this.usersSubject.next(users);
//     });
//   }

//   login(username: string) {
//     if (!username) return;
//     this.username = username;
//     this.socket.emit('register', username);
//     this.loggedInSubject.next(true);
//   }

//   sendMessage(recipient: string, message: string) {
//     if (!recipient || !message) return;
//     this.socket.emit('privateMessage', { recipient, message });
//   }

//   loadChatWith(recipient: string) {
//     if (!recipient) return;
//     this.socket.emit('loadMessages', { recipient });
//   }

//   loadAllMessages() {
//     this.socket.emit('loadAllMessages');
//   }
// }

import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private messagesSubject = new BehaviorSubject<any[]>([]);
  messages$ = this.messagesSubject.asObservable();

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  private usersSubject = new BehaviorSubject<string[]>([]);
  users$ = this.usersSubject.asObservable();

  private lastMessageSubject = new Subject<{ user: string, message: string }>();
  lastMessage$ = this.lastMessageSubject.asObservable();

  requestLastMessageWith(user: string) {
    this.socket.emit('getLastMessage', { recipient: user });
  }

  private username: string = '';

  constructor() {
    this.socket = io(`${'https://chatserver-jhde.onrender.com'}`);
    // this.socket = io(`${environment.apiUrl || 'http://localhost:5000'}`);

    this.socket.on('privateMessage', (msg: any) => {
      const currentMsgs = this.messagesSubject.value;
      this.messagesSubject.next([...currentMsgs, msg]);
    });

    this.socket.on('loadMessages', (msgs: any[]) => {
      this.messagesSubject.next(msgs);
    });

    this.socket.on('lastMessage', (data) => {
      this.lastMessageSubject.next(data);
    });
  }

  login(username: string) {
    if (!username) return;
    this.username = username;
    this.socket.emit('register', username);
    this.loggedInSubject.next(true);
  }

  sendMessage(recipient: string, message: string) {
    if (!recipient || !message) return;
    this.socket.emit('privateMessage', { recipient, message });
  }

  loadChatWith(recipient: string) {
    if (!recipient) return;
    this.socket.emit('loadMessages', { recipient });
  }



}
