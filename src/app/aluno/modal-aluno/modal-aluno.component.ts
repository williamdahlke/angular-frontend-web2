import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Aluno } from '../../shared';

@Component({
  selector: 'app-modal-aluno',
  templateUrl: './modal-aluno.component.html',
  styleUrl: './modal-aluno.component.css'
})
export class ModalAlunoComponent {
  @Input() aluno! : Aluno;

  constructor(public activeModal : NgbActiveModal){}
}
