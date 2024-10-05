import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarMatriculaComponent } from './listar-matricula/listar-matricula.component';
import { EditarMatriculaComponent } from './editar-matricula/editar-matricula.component';
import { InserirMatriculaComponent } from './inserir-matricula/inserir-matricula.component';
import { MatriculaService } from './services/matricula.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';  // Importando NgSelectModule
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ModalMatriculaComponent } from './modal-matricula/modal-matricula.component';

@NgModule({
  declarations: [
    ListarMatriculaComponent,
    EditarMatriculaComponent,
    InserirMatriculaComponent,
    ModalMatriculaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgSelectModule
  ],
  providers: [
    provideNgxMask({ /* opções de cfg */ }),
    MatriculaService
  ]
})
export class MatriculaModule { }
