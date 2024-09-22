import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarAlunoComponent } from './listar-aluno/listar-aluno.component';
import { InserirAlunoComponent } from './inserir-aluno/inserir-aluno.component';
import { EditarAlunoComponent } from './editar-aluno/editar-aluno.component';
import { AlunoService } from './services/aluno.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    ListarAlunoComponent,
    InserirAlunoComponent,
    EditarAlunoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask({ /* opções de cfg */ }),
    AlunoService
  ]
})
export class AlunoModule { }
