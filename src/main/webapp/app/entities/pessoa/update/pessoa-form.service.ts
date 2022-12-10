import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPessoa, NewPessoa } from '../pessoa.model';
import { CustomCPFCNPJValidatorService } from '../validators/cpf-validators.service';
import { PessoaService } from '../service/pessoa.service';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPessoa for edit and NewPessoaFormGroupInput for create.
 */
type PessoaFormGroupInput = IPessoa | PartialWithRequiredKeyOf<NewPessoa>;

type PessoaFormDefaults = Pick<NewPessoa, 'id'>;

type PessoaFormGroupContent = {
  id: FormControl<IPessoa['id'] | NewPessoa['id']>;
  nome: FormControl<IPessoa['nome']>;
  sexo: FormControl<IPessoa['sexo']>;
  email: FormControl<IPessoa['email']>;
  dataNascimento: FormControl<IPessoa['dataNascimento']>;
  naturalidade: FormControl<IPessoa['naturalidade']>;
  nacionalidade: FormControl<IPessoa['nacionalidade']>;
  cpf: FormControl<IPessoa['cpf']>;
};

export type PessoaFormGroup = FormGroup<PessoaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PessoaFormService {
  constructor(protected pessoaService: PessoaService, protected customCPFCNPJValidatorService: CustomCPFCNPJValidatorService) {}

  createPessoaFormGroup(pessoa: PessoaFormGroupInput = { id: null }): PessoaFormGroup {
    const pessoaRawValue = {
      ...this.getFormDefaults(),
      ...pessoa,
    };
    return new FormGroup<PessoaFormGroupContent>({
      id: new FormControl(
        { value: pessoaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(pessoaRawValue.nome, {
        validators: [Validators.required],
      }),
      sexo: new FormControl(pessoaRawValue.sexo),
      email: new FormControl(
        { value: pessoaRawValue.email, disabled: false },
        {
          validators: [Validators.email],
        }
      ),
      dataNascimento: new FormControl(pessoaRawValue.dataNascimento, {
        validators: [Validators.required],
      }),
      naturalidade: new FormControl(pessoaRawValue.naturalidade),
      nacionalidade: new FormControl(pessoaRawValue.nacionalidade),
      cpf: new FormControl(pessoaRawValue.cpf, {
        validators: [
          Validators.required,
          Validators.pattern('^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}$'),
          this.customCPFCNPJValidatorService.isValidCpf(),
        ],
        asyncValidators: [this.customCPFCNPJValidatorService.existingCpfValidator(this.pessoaService, pessoa.id)],
        updateOn: 'blur',
      }),
    });
  }

  getPessoa(form: PessoaFormGroup): IPessoa | NewPessoa {
    return form.getRawValue() as IPessoa | NewPessoa;
  }

  resetForm(form: PessoaFormGroup, pessoa: PessoaFormGroupInput): void {
    const pessoaRawValue = { ...this.getFormDefaults(), ...pessoa };
    form.reset(
      {
        ...pessoaRawValue,
        id: { value: pessoaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PessoaFormDefaults {
    return {
      id: null,
    };
  }
}
