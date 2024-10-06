import { Component, OnInit } from '@angular/core';
import { MatriculaService } from '../services/matricula.service';
import { CursoService } from '../../curso/services/curso.service';
import { ModalMatriculaComponent } from '../modal-matricula/modal-matricula.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Curso, Matricula } from '../../shared';

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
  errorMessages : string[] = [];     
  tituloErro : string = "";       

  ngOnInit(): void {
    this.getCursosFromDB();
  }

  private getCursosFromDB() {
    this.serviceCursos.listarTodos().subscribe({
      next: (data) => {
        if (data != null) {
          this.cursos = data;
          this.cursos = this.filterCursos();
        }
      },
      error: (err) => {
        this.tituloErro = "Erro ao carregar as matriculas";
        if (err.error) {
          this.errorMessages = Object.values(err.error);
        } else {
          this.errorMessages = [`${err.status} ${err.message}`];
        }
      }
    });
  }

  remover($event : any, matricula : Matricula){
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o aluno ${matricula.aluno?.nome} do curso ${matricula.curso?.nome}?`)){
      this.serviceMatricula.remover(matricula.id!).subscribe({
        complete: () => {
          this.getCursosFromDB();
        },
        error: (err) => {
          this.tituloErro = "Erro ao remover uma matrícula";
          if (err.error){
            this.errorMessages = Object.values(err.error);
          } else{
            this.errorMessages = [`${err.status} ${err.message}`];
          } 
        }
      });      
    }  
  }

  filterCursos(): Curso[] {
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
  
  existeErros() : boolean{  
    if (this.errorMessages.length > 0){
      return true;
    } else {
      return false;
    }
  }   
}
