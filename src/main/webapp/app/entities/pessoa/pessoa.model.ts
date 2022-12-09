import dayjs from 'dayjs/esm';
import { TipoSexo } from 'app/entities/enumerations/tipo-sexo.model';

export interface IPessoa {
  id: number;
  nome?: string | null;
  sexo?: TipoSexo | null;
  email?: string | null;
  dataNascimento?: dayjs.Dayjs | null;
  naturalidade?: string | null;
  nacionalidade?: string | null;
  cpf?: string | null;
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
}

export type NewPessoa = Omit<IPessoa, 'id'> & { id: null };
