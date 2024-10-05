import { Aluno } from "./aluno.model";
import { Curso } from "./curso.model";

export class Matricula {
    constructor(
        public id? : number,
        public curso?: Curso,
        public aluno?: Aluno,
        public dtMatricula?: string,
        public nota?: number
    ){}
}
