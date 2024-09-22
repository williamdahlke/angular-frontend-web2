import { Injectable } from '@angular/core';
import { ICrudService } from '../../shared/interfaces/icrud-service';
import { Aluno } from '../../shared/models/aluno.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService implements ICrudService<Aluno> {

  constructor() { }

  LS_CHAVE: string = "alunos";

  listarTodos(): Aluno[] {
    const alunos = localStorage[this.LS_CHAVE];
    return alunos ? JSON.parse(alunos) : [];
  }

  inserir(object: Aluno): void {
    const alunos = this.listarTodos();
    object.id = new Date().getTime();
    alunos.push(object);
    localStorage[this.LS_CHAVE] = JSON.stringify(alunos);
  }

  buscarPorId(id: number) {
    const alunos = this.listarTodos();
    return alunos.find(aluno => aluno.id === id);    
  }

  alterar(object: Aluno): void {
    const alunos = this.listarTodos();
    alunos.forEach((aluno, indexAluno, alunosSalvos) => {
      if (aluno.id === object.id){
        alunosSalvos[indexAluno] = object;
      }
    });

    localStorage[this.LS_CHAVE] = JSON.stringify(alunos);
  }

  remover(id: number): void {
    let alunos = this.listarTodos();
    alunos = alunos.filter(aluno => aluno.id != id);
    localStorage[this.LS_CHAVE] = JSON.stringify(alunos);
  }
}
