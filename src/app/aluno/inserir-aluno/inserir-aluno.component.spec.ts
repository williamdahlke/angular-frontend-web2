import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirAlunoComponent } from './inserir-aluno.component';

describe('InserirAlunoComponent', () => {
  let component: InserirAlunoComponent;
  let fixture: ComponentFixture<InserirAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InserirAlunoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
