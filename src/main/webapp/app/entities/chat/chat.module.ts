import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [SharedModule, ChatRoutingModule, NgxMaskModule.forRoot()],
  declarations: [ChatComponent],
})
export class ChatModule {}
