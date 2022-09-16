import { Tecnico } from "../models/tecnico";

export class RetornoApiPaginacaoViewModel {

    content: Tecnico[];
    size: number;
    totalElements: number;
    number: number;
}