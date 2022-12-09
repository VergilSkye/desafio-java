import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPessoa } from '../pessoa.model';
import { PessoaService } from '../service/pessoa.service';

@Component({
  templateUrl: './pessoa-delete-dialog.component.html',
})
export class PessoaDeleteDialogComponent {
  pessoa?: IPessoa;

  constructor(protected pessoaService: PessoaService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pessoaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
