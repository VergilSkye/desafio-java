import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPessoa } from '../pessoa.model';

@Component({
  selector: 'jhi-pessoa-detail',
  templateUrl: './pessoa-detail.component.html',
})
export class PessoaDetailComponent implements OnInit {
  pessoa: IPessoa | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pessoa }) => {
      this.pessoa = pessoa;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
