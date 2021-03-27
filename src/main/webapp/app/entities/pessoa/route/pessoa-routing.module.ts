import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PessoaComponent } from '../list/pessoa.component';
import { PessoaDetailComponent } from '../detail/pessoa-detail.component';
import { PessoaUpdateComponent } from '../update/pessoa-update.component';
import { PessoaRoutingResolveService } from './pessoa-routing-resolve.service';

const pessoaRoute: Routes = [
  {
    path: '',
    component: PessoaComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PessoaDetailComponent,
    resolve: {
      pessoa: PessoaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PessoaUpdateComponent,
    resolve: {
      pessoa: PessoaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PessoaUpdateComponent,
    resolve: {
      pessoa: PessoaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pessoaRoute)],
  exports: [RouterModule],
})
export class PessoaRoutingModule {}
