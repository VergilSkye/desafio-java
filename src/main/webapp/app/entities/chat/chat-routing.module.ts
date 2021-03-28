import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

const chatRoute: Routes = [
  {
    path: '',
    component: ChatComponent,
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(chatRoute)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
