import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PessoaDetailComponent } from './pessoa-detail.component';

describe('Pessoa Management Detail Component', () => {
  let comp: PessoaDetailComponent;
  let fixture: ComponentFixture<PessoaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PessoaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ pessoa: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PessoaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PessoaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load pessoa on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.pessoa).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
