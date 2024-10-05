import { Component, OnInit } from '@angular/core';
import { MatriculaService } from '../services/matricula.service';
import { Matricula } from '../../shared/models/matricula.model';
import { Curso } from '../../shared/models/curso.model';
import { CursoService } from '../../curso/services/curso.service';
import { Aluno } from '../../shared/models/aluno.model';
import { AlunoService } from '../../aluno/services/aluno.service';
import { uniqBy } from 'lodash';
import { ModalMatriculaComponent } from '../modal-matricula/modal-matricula.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-listar-matricula',
  templateUrl: './listar-matricula.component.html',
  styleUrl: './listar-matricula.component.css'
})
export class ListarMatriculaComponent implements OnInit {
  constructor(private serviceMatricula : MatriculaService,
              private serviceCursos: CursoService,
              private modalService : NgbModal){}

  i : number = 0;
  cursos : Curso [] = [];     

  ngOnInit(): void {
    this.serviceCursos.listarTodos().subscribe({
      next: (data) => {
        if (data != null){
          this.cursos = data;
          this.cursos = this.getCursos();          
        }
      },
      error: (err) => {

      }
    });
  }

  remover($event : any, matricula : Matricula){
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o aluno ${matricula.aluno?.nome} do curso ${matricula.curso?.nome}?`)){
      this.serviceMatricula.remover(matricula.id!).subscribe({
        complete: () => {
          this.cursos = this.getCursos();
        },
        error: (err) => {

        }
      });      
    }  
  }

  getCursos(): Curso[] {
    return this.cursos.filter(curso => curso.matriculas!.length > 0);
  }

  selectedCourse: number | null = null;

  toggleAccordion(id: number) {
    this.selectedCourse = this.selectedCourse === id ? null : id;
  }

  abrirModal(matricula : Matricula){
    const modalRef = this.modalService.open(ModalMatriculaComponent);
    modalRef.componentInstance.matricula = matricula;
  }  
}
