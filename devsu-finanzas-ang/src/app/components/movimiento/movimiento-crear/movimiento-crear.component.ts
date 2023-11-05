import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  HostListener,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentaService } from '@app/services/cuenta.service';
import { MENSAJES } from '@app/global/globals';
import { ErrorHandlingService } from '@app/services/error-handling.service';
import * as $ from 'jquery';
import 'select2';
import { MovimientoService } from '@app/services/movimiento.service';

@Component({
  selector: 'app-movimiento-crear',
  templateUrl: './movimiento-crear.component.html',
  styleUrls: ['./movimiento-crear.component.scss'],
})
export class MovimientoCrearComponent {
  @Output() crear = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();
  movimientoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cuentaService: CuentaService,
    private movimientoService: MovimientoService,
    private errorHandlingService: ErrorHandlingService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.listarCuentas();

    $('#cuentaSelect').on('change', (event) => {
      const selectedValue = event.target.value;
      this.movimientoForm.get('numeroCuenta').setValue(selectedValue);
    });
  }

  inicializarFormulario(): void {
    this.movimientoForm = this.formBuilder.group({
      fecha: [''],
      numeroCuenta: ['', Validators.required],
      tipo: ['Ahorros', Validators.required],
      movimiento: [0, Validators.required],
    });
  }

  listarCuentas() {
    this.cuentaService.listarCuentas().subscribe({
      next: (response) => {
        $('#cuentaSelect')
          .select2({
            data: response.data.map((cuenta) => ({
              id: cuenta.numeroCuenta,
              text: `${cuenta.numeroCuenta} - ${cuenta.clienteId.nombre}`,
            })),
          })
          .val(null)
          .trigger('change');
      },
    });
  }

  crearMovimiento(): void {
    this.movimientoForm.patchValue({
      fecha: this.formatearFecha(new Date()),
    });
    if (this.movimientoForm.valid) {
      this.movimientoService.crearMovimiento(this.movimientoForm.value).subscribe({
        next: () => {
          window.alert(MENSAJES.movimientoCreado.mensaje);
          this.crear.emit();
        },
        error: (error) => this.errorHandlingService.handleErrors(error),
      });
    }
  }

  formatearFecha(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    const hours = fecha.getHours().toString().padStart(2, '0');
    const minutes = fecha.getMinutes().toString().padStart(2, '0');
    const seconds = fecha.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  cancelarCreacion(): void {
    this.cancelar.emit();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.cancelarCreacion();
    }
  }

}
