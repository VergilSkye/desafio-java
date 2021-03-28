import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'jhi-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  constructor(protected activatedRoute: ActivatedRoute, protected router: Router) {}
}
