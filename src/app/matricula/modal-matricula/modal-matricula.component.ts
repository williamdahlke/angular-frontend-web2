import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Matricula } from '../../shared';

@Component({
  selector: 'app-modal-matricula',
  templateUrl: './modal-matricula.component.html',
  styleUrl: './modal-matricula.component.css'
})
export class ModalMatriculaComponent {
  @Input() matricula! : Matricula;

  constructor(public activeModal : NgbActiveModal){}
}
