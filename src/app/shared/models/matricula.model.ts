import { Aluno } from "./aluno.model";
import { Curso } from "./curso.model";

export class Matricula {
    constructor(
        public id? : number,
        public Curso?: Curso,
        public Aluno?: Aluno,
        public dataMatricula?: string,
        public nota?: number
    ){}
}
