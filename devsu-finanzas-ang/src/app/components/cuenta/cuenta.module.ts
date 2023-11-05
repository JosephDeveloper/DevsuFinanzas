import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CuentaComponent } from './cuenta.component';
import { CuentaCrearComponent } from './cuenta-crear/cuenta-crear.component';
import { ConfirmModule } from '../confirm/confirm.module';
import { CuentaEditarComponent } from './cuenta-editar/cuenta-editar.component';

@NgModule({
  declarations: [
    CuentaComponent,
    CuentaCrearComponent,
    CuentaEditarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmModule
  ]
})
export class CuentaModule { }
