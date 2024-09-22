import { Component, OnInit, ViewChild } from '@angular/core';
import { CursoService } from '../services/curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../../shared/models/curso.model';
import { NgForm } from '@angular/forms';

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
    const data = this.service.buscarPorId(id);
    if (data !== undefined){
      this.curso = data;
    } 
    else{
      throw new Error("Curso não encontrado para o id: " + id);
    }    
  }

  atualizar() : void{
    if (this.formCurso.form.valid){
      this.service.alterar(this.curso);
      this.router.navigate(['/cursos']);
    }
  }
}
