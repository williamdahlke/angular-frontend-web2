import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatriculaService } from '../services/matricula.service';
import { AlunoService } from '../../aluno/services/aluno.service';
import { CursoService } from '../../curso/services/curso.service';
import { Convert } from '../../shared/converts/convert';
import { Aluno, Curso, Matricula } from '../../shared';

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
  errorMessages : string[] = [];     
  tituloErro : string = "";    

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
        this.tituloErro = "Erro ao buscar os dados do aluno";
        if (err.error){
          this.errorMessages = Object.values(err.error);
        } else{
          this.errorMessages = [`${err.status} ${err.message}`];
        }   
      }
    });

    this.serviceCurso.buscarPorId(this.matricula.curso!.id!).subscribe({
      next: (data) => {
        if (data != null){
          this.matricula.curso = data;
        }
      },
      error: (err) => {
        this.tituloErro = "Erro ao buscar os dados do curso";
        if (err.error){
          this.errorMessages = Object.values(err.error);
        } else{
          this.errorMessages = [`${err.status} ${err.message}`];
        }   
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
          this.tituloErro = "Erro ao inserir a matrícula";
          if (err.error){
            this.errorMessages = Object.values(err.error);
          } else{
            this.errorMessages = [`${err.status} ${err.message}`];
          }   
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
        this.tituloErro = "Erro ao listar os alunos";
        if (err.error){
          this.errorMessages = Object.values(err.error);
        } else{
          this.errorMessages = [`${err.status} ${err.message}`];
        }   
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
        this.tituloErro = "Erro ao listar os cursos";
        if (err.error){
          this.errorMessages = Object.values(err.error);
        } else{
          this.errorMessages = [`${err.status} ${err.message}`];
        }   
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

  existeErros() : boolean{  
    if (this.errorMessages.length > 0){
      return true;
    } else {
      return false;
    }
  }   
}
