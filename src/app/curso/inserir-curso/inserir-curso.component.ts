import { Component, ViewChild } from '@angular/core';
import { CursoService } from '../services/curso.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Curso } from '../../shared/models/curso.model';

@Component({
  selector: 'app-inserir-curso',
  templateUrl: './inserir-curso.component.html',
  styleUrl: './inserir-curso.component.css'
})
export class InserirCursoComponent {
  constructor(private service : CursoService, 
              private router : Router){

  }

  @ViewChild('formCurso') formCurso! : NgForm;
  curso : Curso = new Curso();

  inserir() : void{
    if (this.formCurso.form.valid){
      this.service.inserir(this.curso);
      this.router.navigate(["/cursos"]);
    }
  }
}
