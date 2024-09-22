import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirCursoComponent } from './inserir-curso.component';

describe('InserirCursoComponent', () => {
  let component: InserirCursoComponent;
  let fixture: ComponentFixture<InserirCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InserirCursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
