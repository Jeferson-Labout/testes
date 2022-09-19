import { Cliente } from "../models/cliente";

export class ClientePaginacaoViewModel {

    content: Cliente[];
    size: number;
    totalElements: number;
    number: number;
}