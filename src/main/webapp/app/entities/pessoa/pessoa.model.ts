import * as dayjs from 'dayjs';
import { TipoSexo } from 'app/entities/enumerations/tipo-sexo.model';

export interface IPessoa {
  id?: number;
  nome?: string;
  sexo?: TipoSexo | null;
  email?: string | null;
  dataNascimento?: dayjs.Dayjs;
  naturalidade?: string | null;
  nacionalidade?: string | null;
  cpf?: string;
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
}

export class Pessoa implements IPessoa {
  constructor(
    public id?: number,
    public nome?: string,
    public sexo?: TipoSexo | null,
    public email?: string | null,
    public dataNascimento?: dayjs.Dayjs,
    public naturalidade?: string | null,
    public nacionalidade?: string | null,
    public cpf?: string,
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date
  ) {}
}

export function getPessoaIdentifier(pessoa: IPessoa): number | undefined {
  return pessoa.id;
}
