import { Component, OnInit, ViewChild } from '@angular/core';
import { MatriculaService } from '../services/matricula.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Matricula } from '../../shared/models/matricula.model';
import { Aluno } from '../../shared/models/aluno.model';
import { Curso } from '../../shared/models/curso.model';
import { AlunoService } from '../../aluno/services/aluno.service';
import { CursoService } from '../../curso/services/curso.service';

@Component({
  selector: 'app-editar-matricula',
  templateUrl: './editar-matricula.component.html',
  styleUrl: './editar-matricula.component.css'
})
export class EditarMatriculaComponent implements OnInit {
  constructor(
    private service: MatriculaService,
    private serviceAluno: AlunoService,
    private serviceCurso: CursoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    const res = this.service.buscarPorId(id);
    if (res !== undefined) 
      this.matricula = res;
    else 
      throw new Error('Matricula não encontrada: id = ' + id);

      console.log(this.matricula)
  }

  @ViewChild('formMatricula') formMatricula! : NgForm;

  matricula : Matricula = new Matricula();
  idAluno : number = 0;
  idCurso : number = 0;

  atualizar(): void {
    this.matricula.Aluno = this.serviceAluno.buscarPorId(this.matricula.Aluno!.id!);
    this.matricula.Curso = this.serviceCurso.buscarPorId(this.matricula.Curso!.id!);
    console.log(this.matricula);
    if (this.formMatricula.form.valid) {
      this.service.alterar(this.matricula);
      this.router.navigate(['/matriculas']);
    }
  }

  listarAlunos() : Aluno[]{
    return this.serviceAluno.listarTodos();
  }

  listarCursos() : Curso[]{
    return this.serviceCurso.listarTodos();
  }
}
