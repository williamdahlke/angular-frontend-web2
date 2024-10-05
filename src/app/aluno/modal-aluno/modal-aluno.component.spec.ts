import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlunoComponent } from './modal-aluno.component';

describe('ModalAlunoComponent', () => {
  let component: ModalAlunoComponent;
  let fixture: ComponentFixture<ModalAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAlunoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
