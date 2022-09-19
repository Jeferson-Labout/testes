import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  pgIndex = 2;
  screenWidth = 0;
  firstLastButtons = true;
  pnDisabled = true;
  hdPageSize = true;
  totalElementos = 0;
  pagina = 0;
  tamanho = 5;
  pageSizeOptions: number[] = [5, 10, 15, 100];

  clientes: Cliente[] = []
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private service: ClienteService
  ) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.findAllPaginada(this.pagina, this.tamanho);
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Cliente>(this.clientes);



  // findAll() {
  //   this.service.findAll().subscribe(resposta => {
  //     this.clientes = resposta
  //     this.dataSource = new MatTableDataSource<Cliente>(resposta);
  //     this.dataSource.paginator = this.paginator;
  //   })
  // }

  findAllPaginada(pagina: number, tamanho: number) {
    this.service.findAllPaginada(pagina, tamanho).subscribe(resposta => {
      this.clientes = resposta.content
      this.totalElementos = resposta.totalElements;// pegar o total de elementos
      this.pagina = resposta.number;// pegar o nu   

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
