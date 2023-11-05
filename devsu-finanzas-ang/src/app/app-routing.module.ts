import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { MovimientoComponent } from './components/movimiento/movimiento.component';
import { ReporteComponent } from './components/reporte/reporte.component';

const routes: Routes = [
  { path: 'cuenta', component: CuentaComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'movimiento', component: MovimientoComponent },
  { path: 'reporte', component: ReporteComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
