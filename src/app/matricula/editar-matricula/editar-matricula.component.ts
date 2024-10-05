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
    this.matricula.aluno = new Aluno();
    this.matricula.curso = new Curso();

    let id = +this.route.snapshot.params['id'];

    this.service.buscarPorId(id).subscribe({
      next: (data) =>{
        if (data != null){
          this.matricula = data;          
        }        
      },
      error: (err) => {

      }
    });

    this.listarAlunos();
    this.listarCursos();
  }

  @ViewChild('formMatricula') formMatricula! : NgForm;

  matricula : Matricula = new Matricula();  
  alunos : Aluno[] = [];
  cursos : Curso[] = [];

  atualizar(): void {
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
        if (data !)
        this.matricula.curso = data;
      }, 
      error: (err) => {

      }
    });

    if (this.formMatricula.form.valid) {
      this.service.alterar(this.matricula).subscribe({
        complete: () => {
          this.router.navigate(['/matriculas']);
        },
        error: (err) => {

        }
      })
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
}
