import { Component, OnInit } from '@angular/core';
import { CursoService } from '../services/curso.service';
import { Curso } from '../../shared/models/curso.model';

@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrl: './listar-curso.component.css'
})
export class ListarCursoComponent implements OnInit {
  constructor(private service : CursoService){
  }

  cursos : Curso[] = [];      

  ngOnInit(): void {
    this.cursos = this.listarCursos();
  }

  listarCursos() : Curso[]{
    return this.service.listarTodos();
  }

  remover($event : any, curso : Curso){
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o curso ${curso.nome}?`)){
      this.service.remover(curso.id!);
      this.cursos = this.listarCursos();
    }    
  }
}
