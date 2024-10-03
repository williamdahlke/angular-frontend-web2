import { Injectable } from '@angular/core';
import { ICrudService } from '../../shared/interfaces/icrud-service';
import { Curso } from '../../shared/models/curso.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CursoService implements ICrudService<Curso>{

  BASE_URL = "http://localhost:8080/cursos"

  httpOptions = {
    observe: "response" as "response",    
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
    
  constructor(private httpClient: HttpClient) { }
    
  //Listar todos requisição:
  listarTodosRequest(): Observable<Curso[] | null> {
    return this.httpClient.get<Curso[]>(
      this.BASE_URL, this.httpOptions).pipe(
        map((resp: HttpResponse<Curso[]>) => {
          if (resp.status!= 200){
            return [];
          } else{
            return resp.body;
          }
        }), catchError((e, c) => {
          return throwError(() => e);
        })
      );
  }

  LS_CHAVE = "";

  listarTodos(): Curso[] {
    const cursos = localStorage[this.LS_CHAVE];
    return cursos ? JSON.parse(cursos) : [];
  }

  inserir(object: Curso): void {
    const cursos = this.listarTodos();
    object.id = new Date().getTime();
    cursos.push(object);
    localStorage[this.LS_CHAVE] = JSON.stringify(cursos);
  }

  buscarPorId(id: number) {
    const cursos = this.listarTodos();
    return cursos.find(curso => curso.id === id);
  }

  alterar(object: Curso): void {    
    const cursos = this.listarTodos();    
    cursos.forEach((curso, indexCurso, cursosSalvos) => {
      if (curso.id === object.id){
        cursosSalvos[indexCurso] = object;
      }
    });

    localStorage[this.LS_CHAVE] = JSON.stringify(cursos);
  }

  remover(id: number): void {
    let cursos = this.listarTodos();
    cursos = cursos.filter(curso => curso.id != id);
    localStorage[this.LS_CHAVE] = JSON.stringify(cursos);
  }
}
