import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Curso } from '../../shared';

@Component({
  selector: 'app-modal-curso',
  templateUrl: './modal-curso.component.html',
  styleUrl: './modal-curso.component.css'
})
export class ModalCursoComponent {
  @Input() curso! : Curso;

  constructor(public activeModal : NgbActiveModal){}
}
