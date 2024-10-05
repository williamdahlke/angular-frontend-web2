import { Component, Input } from '@angular/core';
import { Curso } from '../../shared/models/curso.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-curso',
  templateUrl: './modal-curso.component.html',
  styleUrl: './modal-curso.component.css'
})
export class ModalCursoComponent {
  @Input() curso! : Curso;

  constructor(public activeModal : NgbActiveModal){}
}
