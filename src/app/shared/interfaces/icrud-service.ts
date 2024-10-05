import { Observable } from "rxjs";

export interface ICrudService<T> {
    listarTodos() : Observable<Array<T> | null>;
    inserir(object : T) : Observable<T | null>;
    buscarPorId(id : number) : Observable<T | null>;
    alterar(object : T) : Observable<T | null>;
    remover(id : number) : Observable<T | null>;       
}
