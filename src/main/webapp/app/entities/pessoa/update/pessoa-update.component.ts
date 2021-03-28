import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPessoa, Pessoa } from '../pessoa.model';
import { PessoaService } from '../service/pessoa.service';
import { CustomCPFCNPJValidatorService } from '../validators/cpf-validators.service';

@Component({
  selector: 'jhi-pessoa-update',
  templateUrl: './pessoa-update.component.html',
})
export class PessoaUpdateComponent implements OnInit {
  isSaving = false;

  pessoaId = 0;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    sexo: [],
    email: ['', [Validators.email]],
    dataNascimento: [null, [Validators.required]],
    naturalidade: [],
    nacionalidade: [],
    cpf: [
      null,
      {
        validators: [
          Validators.required,
          Validators.pattern('^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}$'),
          this.customCPFCNPJValidatorService.isValidCpf(),
        ],
        asyncValidators: [this.customCPFCNPJValidatorService.existingCpfValidator(this.pessoaService, this.pessoaId)],
        updateOn: 'blur',
      },
    ],
  });

  constructor(
    protected pessoaService: PessoaService,
    protected customCPFCNPJValidatorService: CustomCPFCNPJValidatorService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pessoa }) => {
      this.updateForm(pessoa);
      this.pessoaId = pessoa.id ?? 0;
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pessoa = this.createFromForm();
    if (pessoa.id !== undefined) {
      this.subscribeToSaveResponse(this.pessoaService.update(pessoa));
    } else {
      this.subscribeToSaveResponse(this.pessoaService.create(pessoa));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPessoa>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => console.error('Ocorreu um erro não identificado')
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(pessoa: IPessoa): void {
    this.editForm.patchValue({
      id: pessoa.id,
      nome: pessoa.nome,
      sexo: pessoa.sexo,
      email: pessoa.email,
      dataNascimento: pessoa.dataNascimento,
      naturalidade: pessoa.naturalidade,
      nacionalidade: pessoa.nacionalidade,
      cpf: pessoa.cpf,
    });
  }

  protected createFromForm(): IPessoa {
    return {
      ...new Pessoa(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      sexo: this.editForm.get(['sexo'])!.value,
      email: this.editForm.get(['email'])!.value,
      dataNascimento: this.editForm.get(['dataNascimento'])!.value,
      naturalidade: this.editForm.get(['naturalidade'])!.value,
      nacionalidade: this.editForm.get(['nacionalidade'])!.value,
      cpf: this.editForm.get(['cpf'])!.value,
    };
  }
}
