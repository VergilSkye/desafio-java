import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'pessoa',
        data: { pageTitle: 'pessoaApp.pessoa.home.title' },
        loadChildren: () => import('./pessoa/pessoa.module').then(m => m.PessoaModule),
      },
      {
        path: 'chat',
        data: { pageTitle: 'pessoaApp.chat.home.title' },
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
