import dayjs from 'dayjs/esm';

import { TipoSexo } from 'app/entities/enumerations/tipo-sexo.model';

import { IPessoa, NewPessoa } from './pessoa.model';

export const sampleWithRequiredData: IPessoa = {
  id: 82183,
  nome: 'Rodovia',
  dataNascimento: dayjs('2021-03-26'),
  cpf: 'RAM Bedfordshire Aço',
};

export const sampleWithPartialData: IPessoa = {
  id: 2046,
  nome: 'intuitive directional reinvent',
  dataNascimento: dayjs('2021-03-25'),
  naturalidade: 'verde-azulado Mesa',
  cpf: 'Functionality Sem Account',
};

export const sampleWithFullData: IPessoa = {
  id: 76936,
  nome: 'implement Mouse AGP',
  sexo: TipoSexo['MASCULINO'],
  email: 'Mrcia97@gmail.com',
  dataNascimento: dayjs('2021-03-25'),
  naturalidade: 'Genérico index Front-line',
  nacionalidade: 'optimize',
  cpf: 'Rodovia Metal Re-engineered',
};

export const sampleWithNewData: NewPessoa = {
  nome: 'line',
  dataNascimento: dayjs('2021-03-25'),
  cpf: 'Director generating',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
