import { Component, OnInit, ViewChild } from '@angular/core';
import { CursoService } from '../services/curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Curso } from '../../shared';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrl: './editar-curso.component.css'
})
export class EditarCursoComponent implements OnInit{
  constructor(private service : CursoService,
              private route : ActivatedRoute,
              private router : Router){}

  @ViewChild('formCurso') formCurso! : NgForm;
  curso : Curso = new Curso();
  errorMessages : string[] = [];
  tituloErro : string = "";
  
  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];

    this.service.buscarPorId(id).subscribe({
      next: (data : Curso | null ) => {
        if (data != null){
          this.curso = data;
        }
      },
      error: (err) => {
        this.tituloErro = "Erro ao buscar um curso";
        if (err.error){
          this.errorMessages = Object.values(err.error);
        } else{
          this.errorMessages = [`${err.status} ${err.message}`];
        }     
      }
    });
  }

  atualizar(){
    if (this.formCurso.form.valid){
      
      this.service.alterar(this.curso).subscribe({
        next: (data) => {
          if (data != null){
            this.router.navigate(['/cursos']);          
          }
        },
        error: (err) => {
          this.tituloErro = "Erro ao atualizar um curso";
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
