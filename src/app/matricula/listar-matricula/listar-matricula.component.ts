import { Component, OnInit } from '@angular/core';
import { MatriculaService } from '../services/matricula.service';
import { Matricula } from '../../shared/models/matricula.model';
import { Curso } from '../../shared/models/curso.model';
import { CursoService } from '../../curso/services/curso.service';
import { Aluno } from '../../shared/models/aluno.model';
import { AlunoService } from '../../aluno/services/aluno.service';
import { uniqBy } from 'lodash';


@Component({
  selector: 'app-listar-matricula',
  templateUrl: './listar-matricula.component.html',
  styleUrl: './listar-matricula.component.css'
})
export class ListarMatriculaComponent implements OnInit {
  constructor(private service : MatriculaService,
              private serviceCursos: CursoService,
              private serviceAlunos: AlunoService
  ){
  }

  i : number = 0;
  matriculas : Matricula[] = [];  
  cursos : Curso [] = [];     
  alunos : Aluno [] = [];
       

  ngOnInit(): void {
    //localStorage.clear();
    this.matriculas = this.listarMatriculas();
    this.cursos = this.getCursos();
  }

  listarMatriculas() : Matricula[]{
    return this.service.listarTodos();
  }

  remover($event : any, matricula : Matricula){
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o aluno ${matricula.Aluno?.nome} do curso ${matricula.Curso?.nome}?`)){
      this.service.remover(matricula.id!);
      this.matriculas = this.listarMatriculas();
      this.cursos = this.getCursos();
    }  
  }

  getCursosFiltrados(idCurso: number): Matricula[] {
    return this.matriculas.filter(matricula => matricula.Curso?.id == idCurso!);
  }

  getCursos(): Curso[] {
    return (uniqBy(this.matriculas.map(matricula => matricula.Curso!), curso => `${curso.nome}`))
  }

  selectedCourse: number | null = null;

  toggleAccordion(id: number) {
    this.selectedCourse = this.selectedCourse === id ? null : id;
  }
}
