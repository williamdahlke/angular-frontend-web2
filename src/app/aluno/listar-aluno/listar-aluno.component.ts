import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../services/aluno.service';
import { Aluno } from '../../shared/models/aluno.model';
import { Observable, throwError } from 'rxjs';


@Component({
  selector: 'app-listar-aluno',
  templateUrl: './listar-aluno.component.html',
  styleUrl: './listar-aluno.component.css'
})

export class ListarAlunoComponent implements OnInit{
  constructor(private service : AlunoService){
  }

  alunos : Aluno[] = [];

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
    error:(error) => {}});

    return this.alunos;
  }

  remover($event : any, aluno : Aluno){
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o aluno ${aluno.nome}?`)){
      this.service.remover(aluno.id!).subscribe({
        complete: () => {
          this.alunos = this.listarAlunos();
        },
        error: () => {

        }
      });
    } 
  } 
}
