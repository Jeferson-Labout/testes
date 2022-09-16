import {
  Component, OnInit, Input, Output, EventEmitter,

} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.scss']
})
export class PaginacaoComponent implements OnInit {


  @Input() totalItems: number;
  @Input() qdtPaginas: number;
  @Input() itemsPerPage: number;
  @Input() itensgrid: number;


  @Output() onPaginate: EventEmitter<number> = new EventEmitter<number>();

  paginaParcial: number = 0;
  pagina: number = 1;
  ultimaPagina: number = 0;
  qtdPorPagina: number = 0;


  constructor() { }

  ngOnInit() {


    setTimeout(() => {
      this.somaPaginacao();
    }, 500)
  }




  somaPaginacao() {

    let qtdPaginas = 0;

    setTimeout(() => {

      qtdPaginas = this.totalItems / this.qdtPaginas;

      this.qtdPorPagina = this.pagina >= qtdPaginas ? this.totalItems : (this.pagina * this.qdtPaginas);

      this.ultimaPagina = this.totalItems == this.itensgrid && this.itensgrid == 0 ? 0 : (this.totalItems - this.itensgrid) + 1;

      this.paginaParcial = this.pagina >= qtdPaginas ? this.ultimaPagina : ((this.qdtPaginas * this.pagina) + 1) - this.itensgrid;

    }, 500)
  }

  mudarPagina(event: any) {

    this.onPaginate.emit(event);
    this.somaPaginacao();
    this.pagina = event.page;

  }


}
