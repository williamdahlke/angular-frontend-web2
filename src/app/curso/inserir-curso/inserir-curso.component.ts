import { Component, ViewChild } from '@angular/core';
import { CursoService } from '../services/curso.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Curso } from '../../shared/models/curso.model';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-inserir-curso',
  templateUrl: './inserir-curso.component.html',
  styleUrl: './inserir-curso.component.css'
})
export class InserirCursoComponent {
  constructor(private service : CursoService, 
              private router : Router){}

  @ViewChild('formCurso') formCurso! : NgForm;
  curso : Curso = new Curso();
  errorMessages : string[] = [];  
  tituloErro : string = "";

  inserir() : void{
    if (this.formCurso.form.valid){
      this.service.inserir(this.curso).subscribe({
        next: (curso) => {
          this.router.navigate(["/cursos"]);
        },
        error: (err) => {
          this.tituloErro = "Erro ao inserir um curso";
          if (err.error){
            this.errorMessages = Object.values(err.error);
          } else{
            this.errorMessages = [`${err.status} ${err.message}`];
          }     
        }
      });
    }
  }

  existeErros() : boolean{  
    if (this.errorMessages.length > 0){
      return true;
    } else {
      return false;
    }
  }  
}
