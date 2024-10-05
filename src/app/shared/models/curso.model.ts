import { Matricula } from "./matricula.model";

export class Curso {
    constructor(
        public id? : number,
        public nome? : string,
        public link? : string,
        public matriculas? : Matricula[]
    ){}
}
