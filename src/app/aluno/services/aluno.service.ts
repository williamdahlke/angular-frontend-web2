import { Injectable } from '@angular/core';
import { ICrudService } from '../../shared/interfaces/icrud-service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Convert } from '../../shared/converts/convert';
import { Aluno } from '../../shared';

const convert = new Convert();

@Injectable({
  providedIn: 'root'
})
export class AlunoService implements ICrudService<Aluno> {

  BASE_URL = "http://localhost:8080/alunos"

  httpOptions = {
    observe: "response" as "response",    
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
    
  constructor(private httpClient: HttpClient) { }
    
  listarTodos(): Observable<Aluno[] | null> {
    return this.httpClient.get<Aluno[]>(
      this.BASE_URL, this.httpOptions).pipe(
        map((resp: HttpResponse<Aluno[]>) => {
          if (resp.status!= 200){
            return [];
          } else{
            resp.body!.forEach(element => {
              element.dtNascimento = convert.dateFromRest((element.dtNascimento!))
            });
            return resp.body;
          }
        }), catchError((e, c) => {
          return throwError(() => e);
        })
      );
  }

  buscarPorId(id: number) : Observable<Aluno | null> {
    return this.httpClient.get<Aluno>(this.BASE_URL + "/" + id, 
      this.httpOptions).pipe(
        map((resp : HttpResponse<Aluno>) => {
          if (resp.status!= 200){
            return null;
          } else{
            resp.body!.dtNascimento! = convert.dateFromRest((resp.body!.dtNascimento!))                      
            return resp.body;
          }          
        }),
        catchError((e, c) =>{
          return throwError(() => e);
        }));
  }

  inserir(aluno : Aluno): Observable<Aluno | null> {
    aluno.dtNascimento = convert.dateToRest(aluno.dtNascimento!);

    return this.httpClient.post<Aluno>(this.BASE_URL,
      JSON.stringify(aluno), this.httpOptions).pipe(
        map((resp : HttpResponse<Aluno>) => {
          if (resp.status != 201){
            return null;
          } else{
            return resp.body;
          }
        }),
        catchError((e, c) => {
          aluno.dtNascimento = convert.dateFromRest(aluno.dtNascimento!);
          return throwError(() => e);
        })
      )    
  }  

  alterar(aluno: Aluno): Observable<Aluno | null> {
    aluno.dtNascimento = convert.dateToRest(aluno.dtNascimento!);    
    return this.httpClient.put<Aluno>(this.BASE_URL + "/" + aluno.id, JSON.stringify(aluno),
      this.httpOptions).pipe(
        map((resp : HttpResponse<Aluno>) => {
          if (resp.status != 200){
            return null;
          } else{
            return resp.body;
          }
        }),
        catchError((e, c) => {
          aluno.dtNascimento = convert.dateFromRest(aluno.dtNascimento!);
          return throwError(() => e);
        })
      )
  }

  remover(id : number) : Observable<Aluno | null> {
    return this.httpClient.delete<Aluno>(this.BASE_URL + "/" + id, this.httpOptions).pipe(
      map((resp: HttpResponse<Aluno>)=> {
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
