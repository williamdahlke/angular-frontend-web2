import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarCursoComponent } from './listar-curso/listar-curso.component';
import { InserirCursoComponent } from './inserir-curso/inserir-curso.component';
import { EditarCursoComponent } from './editar-curso/editar-curso.component';
import { CursoService } from './services/curso.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalCursoComponent } from './modal-curso/modal-curso.component';

@NgModule({
  declarations: [
    ListarCursoComponent,
    InserirCursoComponent,
    EditarCursoComponent,
    ModalCursoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    CursoService
  ]
})
export class CursoModule { }
