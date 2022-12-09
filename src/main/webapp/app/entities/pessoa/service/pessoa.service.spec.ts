import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IPessoa } from '../pessoa.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../pessoa.test-samples';

import { PessoaService, RestPessoa } from './pessoa.service';

const requireRestSample: RestPessoa = {
  ...sampleWithRequiredData,
  dataNascimento: sampleWithRequiredData.dataNascimento?.format(DATE_FORMAT),
};

describe('Pessoa Service', () => {
  let service: PessoaService;
  let httpMock: HttpTestingController;
  let expectedResult: IPessoa | IPessoa[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PessoaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Pessoa', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const pessoa = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(pessoa).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Pessoa', () => {
      const pessoa = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(pessoa).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Pessoa', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Pessoa', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Pessoa', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPessoaToCollectionIfMissing', () => {
      it('should add a Pessoa to an empty array', () => {
        const pessoa: IPessoa = sampleWithRequiredData;
        expectedResult = service.addPessoaToCollectionIfMissing([], pessoa);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pessoa);
      });

      it('should not add a Pessoa to an array that contains it', () => {
        const pessoa: IPessoa = sampleWithRequiredData;
        const pessoaCollection: IPessoa[] = [
          {
            ...pessoa,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPessoaToCollectionIfMissing(pessoaCollection, pessoa);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Pessoa to an array that doesn't contain it", () => {
        const pessoa: IPessoa = sampleWithRequiredData;
        const pessoaCollection: IPessoa[] = [sampleWithPartialData];
        expectedResult = service.addPessoaToCollectionIfMissing(pessoaCollection, pessoa);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pessoa);
      });

      it('should add only unique Pessoa to an array', () => {
        const pessoaArray: IPessoa[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const pessoaCollection: IPessoa[] = [sampleWithRequiredData];
        expectedResult = service.addPessoaToCollectionIfMissing(pessoaCollection, ...pessoaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const pessoa: IPessoa = sampleWithRequiredData;
        const pessoa2: IPessoa = sampleWithPartialData;
        expectedResult = service.addPessoaToCollectionIfMissing([], pessoa, pessoa2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pessoa);
        expect(expectedResult).toContain(pessoa2);
      });

      it('should accept null and undefined values', () => {
        const pessoa: IPessoa = sampleWithRequiredData;
        expectedResult = service.addPessoaToCollectionIfMissing([], null, pessoa, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pessoa);
      });

      it('should return initial array if no Pessoa is added', () => {
        const pessoaCollection: IPessoa[] = [sampleWithRequiredData];
        expectedResult = service.addPessoaToCollectionIfMissing(pessoaCollection, undefined, null);
        expect(expectedResult).toEqual(pessoaCollection);
      });
    });

    describe('comparePessoa', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePessoa(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePessoa(entity1, entity2);
        const compareResult2 = service.comparePessoa(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePessoa(entity1, entity2);
        const compareResult2 = service.comparePessoa(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePessoa(entity1, entity2);
        const compareResult2 = service.comparePessoa(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
