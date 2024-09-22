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
  
  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    const res = this.service.buscarPorId(id);
    if (res !== undefined) 
      this.aluno = res;
    else 
      throw new Error('Aluno não encontrado: id = ' + id);
  }

  @ViewChild('formAluno') formAluno!: NgForm;
  aluno: Aluno = new Aluno();

  atualizar(): void {
    if (this.formAluno.form.valid) {
      this.service.alterar(this.aluno);
      this.router.navigate(['/alunos']);
    }
  }
}
