import { Component, OnInit } from '@angular/core';
import { CursoService } from '../services/curso.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCursoComponent } from '../modal-curso/modal-curso.component';
import { Curso } from '../../shared';

@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrl: './listar-curso.component.css'
})
export class ListarCursoComponent implements OnInit {
  constructor(private service : CursoService,
              private modalService : NgbModal){}

  cursos : Curso[] = [];   
  errorMessages : string[] = [];     
  tituloErro : string = "";

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
        this.tituloErro = "Erro ao carregar os cursos";
        if (err.error){
          this.errorMessages = Object.values(err.error);
        } else{
          this.errorMessages = [`${err.status} ${err.message}`];
        }                  
      }
    });

    return this.cursos;
  }

  remover($event : any, curso : Curso){
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o curso ${curso.nome}?`)){
      
      this.service.remover(curso.id!).subscribe({
        complete: () => {
          this.listarCursos();
        },
        error: (err) => {
          this.tituloErro = "Erro ao remover um curso";
          const errorMessage = err.headers.get('error-message');
          if (err.error){
            this.errorMessages = Object.values(err.error);
          } else if (errorMessage){          
              this.errorMessages = [errorMessage];            
          }
          else { 
            this.errorMessages = [`${err.status} ${err.message}`];            
          }          
        }
      });
      
      this.listarCursos();
    }    
  }

  abrirModal(curso : Curso){
    const modalRef = this.modalService.open(ModalCursoComponent);
    modalRef.componentInstance.curso = curso;
  }

  existeErros() : boolean{  
    if (this.errorMessages.length > 0){
      return true;
    } else {
      return false;
    }
  }  
}
