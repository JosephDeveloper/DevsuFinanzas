import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ClienteModule } from './components/cliente/cliente.module';
import { ErrorHandlingService } from './services/error-handling.service';
import { CuentaModule } from './components/cuenta/cuenta.module';
import { MovimientoModule } from './components/movimiento/movimiento.module';
import { ReporteModule } from './components/reporte/reporte.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClienteModule,
    CuentaModule,
    MovimientoModule,
    ReporteModule
  ],
  providers: [
    ErrorHandlingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
