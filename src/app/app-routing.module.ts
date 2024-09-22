import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as curso from './curso';
import * as aluno from './aluno';

const routes: Routes = [
  { path: '',
    redirectTo: 'cursos/listar',
    pathMatch: 'full'},
  { path: 'cursos',
    redirectTo: 'cursos/listar'},
  { path: 'cursos/listar',
    component: curso.ListarCursoComponent},
  { path: 'cursos/novo',
    component: curso.InserirCursoComponent},
  { path: 'cursos/editar/:id',
    component: curso.EditarCursoComponent},
  { path: 'alunos',
    redirectTo: 'alunos/listar'},
  { path: 'alunos/listar',
    component: aluno.ListarAlunoComponent},
  { path: 'alunos/novo',
    component: aluno.InserirAlunoComponent},
  { path: 'alunos/editar/:id',
    component: aluno.EditarAlunoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
