import { Injectable } from '@angular/core';
import { ICrudService } from '../../shared/interfaces/icrud-service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Convert, Matricula } from '../../shared';

const convert = new Convert();

@Injectable({
  providedIn: 'root'
})
export class MatriculaService implements ICrudService<Matricula>{

  constructor(private httpClient : HttpClient) { }

  BASE_URL = "http://localhost:8080/matriculas";

  httpOptions = {
    observe: "response" as "response",    
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };  

  listarTodos(): Observable<Matricula[] | null> {
    throw new Error('Method not implemented.');
  }

  buscarPorId(id: number): Observable<Matricula | null> {
    return this.httpClient.get<Matricula>(this.BASE_URL + "/" + id, 
      this.httpOptions).pipe(
        map((resp : HttpResponse<Matricula>) => {
          if (resp.status!= 200){
            return null;
          } else{
            resp.body!.dtMatricula! = convert.dateFromRest((resp.body!.dtMatricula!))
            resp.body!.aluno!.dtNascimento = convert.dateFromRest((resp.body!.aluno!.dtNascimento!))
            return resp.body;
          }          
        }),
        catchError((e, c) =>{
          return throwError(() => e);
        }));    
  }

  inserir(object: Matricula): Observable<Matricula | null> {
    object.dtMatricula = convert.dateToRest(object.dtMatricula!);    
    object.aluno!.dtNascimento! = convert.dateToRest(object.aluno?.dtNascimento!)

    console.log(object);

    return this.httpClient.post<Matricula>(this.BASE_URL,
      JSON.stringify(object), this.httpOptions).pipe(
        map((resp : HttpResponse<Matricula>) => {
          if (resp.status != 201){
            return null;
          } else{
            return resp.body;
          }
        }),
        catchError((e, c) => {
          return throwError(() => e);
        })
      )    
  }

  alterar(object: Matricula): Observable<Matricula | null> {
    object.dtMatricula = convert.dateToRest(object.dtMatricula!);
    object.aluno!.dtNascimento! = convert.dateToRest(object.aluno?.dtNascimento!)

    return this.httpClient.put<Matricula>(this.BASE_URL + "/" + object.id, JSON.stringify(object),
      this.httpOptions).pipe(
        map((resp : HttpResponse<Matricula>) => {
          if (resp.status != 200){
            return null;
          } else{
            return resp.body;
          }
        }),
        catchError((e, c) => {
          return throwError(() => e);
        })
      )
  }

  remover(id: number): Observable<Matricula | null> {
    return this.httpClient.delete<Matricula>(this.BASE_URL + "/" + id, this.httpOptions).pipe(
      map((resp: HttpResponse<Matricula>)=> {
        if (resp.status != 200){
          return null;
        } else{
          return resp.body;
        }
      }),
      catchError((e,c) => {
        return throwError(() => e);
      })
    )
  }
}
