import { Component, OnInit } from '@angular/core';
import { CursoService } from '../services/curso.service';
import { Curso } from '../../shared/models/curso.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCursoComponent } from '../modal-curso/modal-curso.component';

@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrl: './listar-curso.component.css'
})
export class ListarCursoComponent implements OnInit {
  constructor(private service : CursoService,
              private modalService : NgbModal){}

  cursos : Curso[] = [];      

  ngOnInit(): void {
    this.cursos = this.listarCursos();
  }

  listarCursos() : Curso[]{
    this.service.listarTodos().subscribe({
      next: (data : Curso[] | null) => {
        if (data == null){
          this.cursos = [];
        } else{
          this.cursos = data;
        }
      },
      error: (err) => {
        
      }
    });

    return this.cursos;
  }

  remover($event : any, curso : Curso){
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o curso ${curso.nome}?`)){
      
      this.service.remover(curso.id!).subscribe({
        complete: () => {
          this.cursos = this.listarCursos();
        },
        error: (err) => {

        }
      });      
    }    
  }

  abrirModal(curso : Curso){
    const modalRef = this.modalService.open(ModalCursoComponent);
    modalRef.componentInstance.curso = curso;
  }
}
