import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovimientoComponent } from './movimiento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MovimientoCrearComponent } from './movimiento-crear/movimiento-crear.component';

@NgModule({
  declarations: [
    MovimientoComponent,
    MovimientoCrearComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MovimientoModule { }
