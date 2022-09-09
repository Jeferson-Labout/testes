import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChamadoComponent } from './chamado/chamado.component';
import { ClienteComponent } from './cliente/cliente.component';
import { HomeComponent } from './home/home.component';
import { TecnicoComponent } from './tecnico/tecnico.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'tecnico', component: TecnicoComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'chamado', component: ChamadoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
