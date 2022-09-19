import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';
interface ChamadoToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-chamado',
  templateUrl: './chamado.component.html',
  styleUrls: ['./chamado.component.scss']
})
export class ChamadoComponent implements OnInit {
  @Output() onTogglesChamado: EventEmitter<ChamadoToggle> = new EventEmitter();
  collapsed = false;
  pgIndex = 2;
  screenWidth = 0;
  firstLastButtons = true;
  pnDisabled = true;
  hdPageSize = true;
  totalElementos = 0;
  pagina = 0;
  tamanho = 5;
  pageSizeOptions: number[] = [5, 10, 15, 100];


  chamado: Chamado[] = []
  FILTERED_DATA: Chamado[] = []
  modalChamado: boolean;
  displayedColumns: string[];
  // displayedColumns2: string[] =  [ 'id','titulo', 'cliente', 'tecnico', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.chamado);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ChamadoService
  ) { }

  ngOnInit(): void {

    this.screenWidth = window.innerWidth;
    if (window.innerWidth >= 960) {
      this.displayedColumns = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
    } else {
      this.displayedColumns = ['id', 'tecnico', 'cliente', 'acoes'];
    }
    this.findAllPaginada(this.pagina, this.tamanho);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;

    if (this.screenWidth <= 960) {
      this.collapsed = true;
      this.onTogglesChamado.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });

      this.displayedColumns = ['id', 'cliente', 'tecnico', 'status', 'acoes'];

    }
    if (this.screenWidth >= 960) {
      this.collapsed = false;
      this.onTogglesChamado.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });

      this.displayedColumns = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
    }



  }

  findAllPaginada(pagina: number, tamanho: number) {
    this.service.findAllPaginada(pagina, tamanho).subscribe(resposta => {
      this.chamado = resposta.content
      console.log(this.chamado)
      this.totalElementos = resposta.totalElements;// pegar o total de elementos
      this.pagina = resposta.number;// pegar o nu   

    })
  }

  // findAll(): void {
  //   this.service.findAll().subscribe(resposta => {
  //     this.chamado = resposta;
  //     this.dataSource = new MatTableDataSource<Chamado>(resposta);
  //     this.dataSource.paginator = this.paginator;
  //   })
  // }
  wideScreen(): Boolean {
    return window.innerWidth >= 960 ? true : false;

  }
  showModalChamado() {
    this.modalChamado = true;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  retornaStatus(status: any): string {
    if (status == '0') {
      return 'ABERTO'
    } else if (status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade: any): string {
    if (prioridade == '0') {
      return 'BAIXA'
    } else if (prioridade == '1') {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }

  orderByStatus(status: any): void {
    let list: Chamado[] = []
    this.chamado.forEach(element => {
      if (element.status == status)
        list.push(element)
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Chamado>(list);
    this.dataSource.paginator = this.paginator;
  }

  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.tamanho = event.pageSize;
    this.findAllPaginada(this.pagina, this.tamanho);
  }

}
