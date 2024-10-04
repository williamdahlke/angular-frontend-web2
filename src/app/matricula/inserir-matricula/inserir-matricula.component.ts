import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatriculaService } from '../services/matricula.service';
import { Matricula } from '../../shared/models/matricula.model';
import { Aluno } from '../../shared/models/aluno.model';
import { AlunoService } from '../../aluno/services/aluno.service';
import { CursoService } from '../../curso/services/curso.service';
import { Curso } from '../../shared/models/curso.model';
import * as moment from 'moment';


@Component({
  selector: 'app-inserir-matricula',
  templateUrl: './inserir-matricula.component.html',
  styleUrl: './inserir-matricula.component.css'
})
export class InserirMatriculaComponent {
  constructor(private service : MatriculaService,
              private serviceAluno : AlunoService,
              private serviceCurso : CursoService,
              private router : Router){}

  @ViewChild('formMatricula') formMatricula! : NgForm;

  matricula : Matricula = new Matricula();
  idAluno : number = 0;
  idCurso : number = 0;
  dataOriginal: Date = new Date();

  inserir() : void{
    this.matricula.Aluno = this.serviceAluno.buscarPorId(this.idAluno);
    //this.matricula.Curso = this.serviceCurso.buscarPorId(this.idCurso);
    this.matricula.dataMatricula = this.formatarData(this.dataOriginal);
    this.matricula.nota = 0;

    if (this.formMatricula.form.valid){
      this.service.inserir(this.matricula);
      this.router.navigate(["/matriculas"]);
    }
  }

  listarAlunos() : Aluno[]{
    return this.serviceAluno.listarTodos();
  }

  listarCursos() : Curso[]{
    return [];
    //return this.serviceCurso.listarTodos();
  }

  formatarData(data: Date): string {
    const dia = String(data.getDate()).padStart(2, '0');  // Adiciona zero à esquerda
    const mes = String(data.getMonth() + 1).padStart(2, '0');  // Meses começam em 0
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
}
