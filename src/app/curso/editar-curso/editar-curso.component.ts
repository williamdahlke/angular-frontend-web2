import { Component, OnInit, ViewChild } from '@angular/core';
import { CursoService } from '../services/curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../../shared/models/curso.model';
import { NgForm } from '@angular/forms';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrl: './editar-curso.component.css'
})
export class EditarCursoComponent implements OnInit{
  constructor(private service : CursoService,
              private route : ActivatedRoute,
              private router : Router){

  }

  @ViewChild('formCurso') formCurso! : NgForm;
  curso : Curso = new Curso();
  
  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];

    this.service.buscarPorId(id).subscribe({
      next: (data : Curso | null ) => {
        if (data != null){
          this.curso = data;
        }
      },
      error: (err) => {
        
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

        }        
      });
    }
  }
}
