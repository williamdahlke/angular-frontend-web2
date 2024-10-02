import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirMatriculaComponent } from './inserir-matricula.component';

describe('InserirMatriculaComponent', () => {
  let component: InserirMatriculaComponent;
  let fixture: ComponentFixture<InserirMatriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InserirMatriculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
