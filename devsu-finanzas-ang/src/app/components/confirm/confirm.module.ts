import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm.component';

@NgModule({
  declarations: [
    ConfirmComponent
  ],
  exports: [
    ConfirmComponent // Asegúrate de exportar el componente
  ],
  imports: [
    CommonModule
  ]
})
export class ConfirmModule { }
