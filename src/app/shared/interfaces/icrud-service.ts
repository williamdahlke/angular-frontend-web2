export interface ICrudService<T> {
    LS_CHAVE : string;    
    listarTodos() : Array<T>;
    inserir(object : T) : void;
    buscarPorId(id : number) : any;
    alterar(object : T) : void;
    remover(id : number) : void;       
}
