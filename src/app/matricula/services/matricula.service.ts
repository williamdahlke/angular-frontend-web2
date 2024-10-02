import { Injectable } from '@angular/core';
import { Matricula } from '../../shared/models/matricula.model';
import { ICrudService } from '../../shared/interfaces/icrud-service';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService implements ICrudService<Matricula>{

  constructor() { }

  LS_CHAVE: string = "matriculas";

  listarTodos(): Matricula[] {
    const alunos = localStorage[this.LS_CHAVE];
    return alunos ? JSON.parse(alunos) : [];
  }

  inserir(object: Matricula): void {
    const matriculas = this.listarTodos();
    object.id = new Date().getTime();
    matriculas.push(object);
    localStorage[this.LS_CHAVE] = JSON.stringify(matriculas);
  }

  buscarPorId(id: number) {
    const matriculas = this.listarTodos();
    return matriculas.find(matricula => matricula.id === id);    
  }

  alterar(object: Matricula): void {
    const matriculas = this.listarTodos();
    matriculas.forEach((matricula, indexMatricula, MatriculaSalvos) => {
      if (matricula.id === object.id){
        MatriculaSalvos[indexMatricula] = object;
      }
    });

    localStorage[this.LS_CHAVE] = JSON.stringify(matriculas);
  }

  remover(id: number): void {
    let matriculas = this.listarTodos();
    matriculas = matriculas.filter(matricula => matricula.id != id);
    localStorage[this.LS_CHAVE] = JSON.stringify(matriculas);
  }
}
