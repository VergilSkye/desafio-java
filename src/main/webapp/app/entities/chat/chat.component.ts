import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from './chat.service';
import { MessageActivity } from './message-activity.model';
@Component({
  selector: 'jhi-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: MessageActivity[] = [];
  message = '';

  subscription?: Subscription;
  constructor(private chatService: ChatService, protected activatedRoute: ActivatedRoute, protected router: Router) {}

  ngOnInit(): void {
    this.chatService.connect();

    this.subscription = this.chatService.receive().subscribe(message => {
      this.messages.push(message);
    });
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  sendMessage(message: string): void {
    if (message.length === 0) {
      return;
    }
    console.error(message);

    this.chatService.sendActivity(message);
    this.message = '';
  }
}
