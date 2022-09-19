import { Chamado } from "../models/chamado";

export class ChamadoPaginacaoViewModel {

    content: Chamado[];
    size: number;
    totalElements: number;
    number: number;
}