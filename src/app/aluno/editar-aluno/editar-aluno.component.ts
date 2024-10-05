import { Component, OnInit, ViewChild } from '@angular/core';
import { AlunoService } from '../services/aluno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from '../../shared/models/aluno.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-aluno',
  templateUrl: './editar-aluno.component.html',
  styleUrl: './editar-aluno.component.css',
})
export class EditarAlunoComponent implements OnInit {
  constructor(
    private service: AlunoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  errorMessages : string[] = [];     
  tituloErro : string = "";    
  
  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];

    const res = this.service.buscarPorId(id).subscribe({
      next: (data) => {
        if (data != null){
          this.aluno = data;
        }        
      },
      error: (err) => {
        this.tituloErro = "Erro ao buscar um aluno";
        if (err.error){
          this.errorMessages = Object.values(err.error);
        } else{
          this.errorMessages = [`${err.status} ${err.message}`];
        }      
      }
    });
  }

  @ViewChild('formAluno') formAluno!: NgForm;
  aluno: Aluno = new Aluno();

  atualizar(): void {
    if (this.formAluno.form.valid) {
      this.service.alterar(this.aluno).subscribe({
        next: (data) => {
          this.router.navigate(['/alunos']);
        },
        error: (err) => {
          this.tituloErro = "Erro ao atualizar um aluno";
          if (err.error){
            this.errorMessages = Object.values(err.error);
          } else{
            this.errorMessages = [`${err.status} ${err.message}`];
          }                
        }
      });
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
