import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Convert } from '../../shared/converts/convert';

const convert : Convert = new Convert();

@Component({
  selector: 'app-inserir-matricula',
  templateUrl: './inserir-matricula.component.html',
  styleUrl: './inserir-matricula.component.css'
})
export class InserirMatriculaComponent implements OnInit {
  constructor(private service : MatriculaService,
              private serviceAluno : AlunoService,
              private serviceCurso : CursoService,
              private router : Router){}

  @ViewChild('formMatricula') formMatricula! : NgForm;

  matricula : Matricula = new Matricula();
  alunos : Aluno[] = [];
  cursos : Curso[] = [];

  ngOnInit(): void {
    this.matricula.aluno = new Aluno();
    this.matricula.curso = new Curso();

    this.listarAlunos();
    this.listarCursos();
  }

  inserir() : void{
    
    this.serviceAluno.buscarPorId(this.matricula.aluno!.id!).subscribe({
      next: (data) => {
        if (data != null){
          this.matricula.aluno = data;
        }
      },
      error: (err) => {

      }
    });

    this.serviceCurso.buscarPorId(this.matricula.curso!.id!).subscribe({
      next: (data) => {
        if (data != null){
          this.matricula.curso = data;
        }
      },
      error: (err) => {

      }
    })

    this.matricula.id = 0;
    this.matricula.dtMatricula = this.getCurrentDate();  
    this.matricula.nota = 1;

    if (this.formMatricula.form.valid){
      this.service.inserir(this.matricula).subscribe({
        complete: () => {
          this.router.navigate(["/matriculas"]);
        },
        error: (err) => {

        }
      });      
    }
  }

  listarAlunos(){  
    this.serviceAluno.listarTodos().subscribe({
       next: (data) => {
         if (data != null){
           this.alunos = data;
         }
       },
       error: (err) => {

       }
     });
  }

  listarCursos(){        
     this.serviceCurso.listarTodos().subscribe({
       next: (data) => {
         if (data != null){
          this.cursos = data; 
         }
       },
       error: (err) => {

      }
    });    
  }

  getCurrentDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const year = today.getFullYear();
    
    return `${day}/${month}/${year}`;
  }  
}
