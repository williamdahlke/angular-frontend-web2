import { Component, ViewChild } from '@angular/core';
import { AlunoService } from '../services/aluno.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Aluno } from '../../shared/models/aluno.model';


@Component({
  selector: 'app-inserir-aluno',
  templateUrl: './inserir-aluno.component.html',
  styleUrl: './inserir-aluno.component.css'
})
export class InserirAlunoComponent {
  constructor(private service : AlunoService,
              private router : Router){

  }

  @ViewChild('formAluno') formAluno! : NgForm;
  aluno : Aluno = new Aluno();

  inserir() : void{
    if (this.formAluno.form.valid){
      this.service.inserir(this.aluno);
      this.router.navigate(["/alunos"]);
    }
  }
}
