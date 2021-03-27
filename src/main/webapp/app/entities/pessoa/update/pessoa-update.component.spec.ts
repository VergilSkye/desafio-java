jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PessoaService } from '../service/pessoa.service';
import { IPessoa, Pessoa } from '../pessoa.model';

import { PessoaUpdateComponent } from './pessoa-update.component';

describe('Component Tests', () => {
  describe('Pessoa Management Update Component', () => {
    let comp: PessoaUpdateComponent;
    let fixture: ComponentFixture<PessoaUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let pessoaService: PessoaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PessoaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PessoaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PessoaUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      pessoaService = TestBed.inject(PessoaService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const pessoa: IPessoa = { id: 456 };

        activatedRoute.data = of({ pessoa });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(pessoa));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const pessoa = { id: 123 };
        spyOn(pessoaService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ pessoa });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: pessoa }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(pessoaService.update).toHaveBeenCalledWith(pessoa);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const pessoa = new Pessoa();
        spyOn(pessoaService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ pessoa });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: pessoa }));
        saveSubject.complete();

        // THEN
        expect(pessoaService.create).toHaveBeenCalledWith(pessoa);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const pessoa = { id: 123 };
        spyOn(pessoaService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ pessoa });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(pessoaService.update).toHaveBeenCalledWith(pessoa);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
