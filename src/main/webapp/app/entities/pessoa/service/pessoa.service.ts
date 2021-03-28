import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPessoa, getPessoaIdentifier } from '../pessoa.model';

export type EntityResponseType = HttpResponse<IPessoa>;
export type EntityArrayResponseType = HttpResponse<IPessoa[]>;

@Injectable({ providedIn: 'root' })
export class PessoaService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/pessoas');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(pessoa: IPessoa): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pessoa);
    return this.http
      .post<IPessoa>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(pessoa: IPessoa): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pessoa);
    return this.http
      .put<IPessoa>(`${this.resourceUrl}/${getPessoaIdentifier(pessoa) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPessoa>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPessoa[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(
        tap(e => console.error(e)),
        map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res))
      );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findWithCpf(rawCPF: string, id: number): Observable<HttpResponse<number>> {
    const cpf = rawCPF.replace(/\D/g, ''); // retirar mascara do cpf
    const options = createRequestOption({ cpf, id });
    return this.http // retorna 1 ou 0 para o numero de cpf utilizados,
      .get<number>(`${this.resourceUrl}/cpf`, { params: options, observe: 'response' });
  }

  addPessoaToCollectionIfMissing(pessoaCollection: IPessoa[], ...pessoasToCheck: (IPessoa | null | undefined)[]): IPessoa[] {
    const pessoas: IPessoa[] = pessoasToCheck.filter(isPresent);
    if (pessoas.length > 0) {
      const pessoaCollectionIdentifiers = pessoaCollection.map(pessoaItem => getPessoaIdentifier(pessoaItem)!);
      const pessoasToAdd = pessoas.filter(pessoaItem => {
        const pessoaIdentifier = getPessoaIdentifier(pessoaItem);
        if (pessoaIdentifier == null || pessoaCollectionIdentifiers.includes(pessoaIdentifier)) {
          return false;
        }
        pessoaCollectionIdentifiers.push(pessoaIdentifier);
        return true;
      });
      return [...pessoasToAdd, ...pessoaCollection];
    }
    return pessoaCollection;
  }

  protected convertDateFromClient(pessoa: IPessoa): IPessoa {
    return Object.assign({}, pessoa, {
      dataNascimento: pessoa.dataNascimento?.isValid() ? pessoa.dataNascimento.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    console.warn(res.body);
    if (res.body) {
      res.body.dataNascimento = res.body.dataNascimento ? dayjs(res.body.dataNascimento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    console.warn(res.body);
    if (res.body) {
      res.body.forEach((pessoa: IPessoa) => {
        pessoa.dataNascimento = pessoa.dataNascimento ? dayjs(pessoa.dataNascimento) : undefined;
      });
    }
    return res;
  }
}
