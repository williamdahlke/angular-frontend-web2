import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../services/aluno.service';
import { Aluno } from '../../shared/models/aluno.model';
import { Observable, throwError } from 'rxjs';
import { ModalAlunoComponent } from '../modal-aluno/modal-aluno.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-listar-aluno',
  templateUrl: './listar-aluno.component.html',
  styleUrl: './listar-aluno.component.css'
})

export class ListarAlunoComponent implements OnInit{
  constructor(private service : AlunoService,
              private modalService : NgbModal){}

  alunos : Aluno[] = [];
  errorMessages : string[] = [];     
  tituloErro : string = "";  

  ngOnInit(): void {
    this.alunos = this.listarAlunos()!;
  }

  listarAlunos() : Aluno[]{
    this.service.listarTodos().subscribe({
      next: (data : Aluno[] | null) => {
        if (data != null){
          this.alunos = data;   
        } else{
          this.alunos = [];
        }
    },
    error:(err) => {
      this.tituloErro = "Erro ao remover um aluno";
      if (err.error){
        this.errorMessages = Object.values(err.error);
      } else{
        this.errorMessages = [`${err.status} ${err.message}`];
      }        
    }});

    return this.alunos;
  }

  remover($event : any, aluno : Aluno){
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o aluno ${aluno.nome}?`)){
      this.service.remover(aluno.id!).subscribe({
        complete: () => {
          this.alunos = this.listarAlunos();
        },
        error: (err) => {
          this.tituloErro = "Erro ao remover um aluno";
          if (err.error){
            this.errorMessages = Object.values(err.error);
          } else{
            this.errorMessages = [`${err.status} ${err.message}`];
          }  
        }
      });
    } 
  } 

  abrirModal(aluno : Aluno){
    const modalRef = this.modalService.open(ModalAlunoComponent);
    modalRef.componentInstance.aluno = aluno;
  }  

  existeErros() : boolean{  
    if (this.errorMessages.length > 0){
      return true;
    } else {
      return false;
    }
  }   
}
