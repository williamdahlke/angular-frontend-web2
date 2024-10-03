export interface ICrudService<T> {
    listarTodos() : Array<T>;
    inserir(object : T) : void;
    buscarPorId(id : number) : any;
    alterar(object : T) : void;
    remover(id : number) : void;       
}
