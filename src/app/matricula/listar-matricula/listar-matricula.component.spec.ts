import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMatriculaComponent } from './listar-matricula.component';

describe('ListarMatriculaComponent', () => {
  let component: ListarMatriculaComponent;
  let fixture: ComponentFixture<ListarMatriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarMatriculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
