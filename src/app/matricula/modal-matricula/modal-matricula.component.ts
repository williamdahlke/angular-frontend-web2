import { Component, Input } from '@angular/core';
import { Matricula } from '../../shared/models/matricula.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-matricula',
  templateUrl: './modal-matricula.component.html',
  styleUrl: './modal-matricula.component.css'
})
export class ModalMatriculaComponent {
  @Input() matricula! : Matricula;

  constructor(public activeModal : NgbActiveModal){}
}
