import { Component, ViewChild } from '@angular/core';
import { AlunoService } from '../services/aluno.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Aluno } from '../../shared';

@Component({
  selector: 'app-inserir-aluno',
  templateUrl: './inserir-aluno.component.html',
  styleUrl: './inserir-aluno.component.css'
})
export class InserirAlunoComponent {
  constructor(private service : AlunoService,
              private router : Router){}

  @ViewChild('formAluno') formAluno! : NgForm;
  aluno : Aluno = new Aluno();
  errorMessages : string[] = [];     
  tituloErro : string = "";  

  inserir() : void{
    if (this.formAluno.form.valid){
      this.service.inserir(this.aluno).subscribe({
        next: (aluno) => {
          this.router.navigate(["/alunos"]);
        },
        error: (err) => {
          this.tituloErro = "Erro ao inserir um aluno";
          if (err.error){
            this.errorMessages = Object.values(err.error);
          } else{
            this.errorMessages = [`${err.status} ${err.message}`];
          }     
        }
      })
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
