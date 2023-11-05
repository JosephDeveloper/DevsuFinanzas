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
import { ClienteService } from '@app/services/cliente.service';

@Component({
  selector: 'app-cuenta-crear',
  templateUrl: './cuenta-crear.component.html',
  styleUrls: ['./cuenta-crear.component.scss'],
})
export class CuentaCrearComponent {
  @Output() crear = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();
  cuentaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cuentaService: CuentaService,
    private clienteService: ClienteService,
    private errorHandlingService: ErrorHandlingService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.listarClientes();

    $('#clientSelect').on('change', (event) => {
      const selectedValue = event.target.value;
      this.cuentaForm.get('clienteId').setValue(selectedValue);
    });
  }

  inicializarFormulario(): void {
    this.cuentaForm = this.formBuilder.group({
      numeroCuenta: ['', Validators.required],
      tipoCuenta: ['Ahorros', Validators.required],
      saldoInicial: [0, Validators.required],
      estado: [true],
      clienteId: [0, Validators.required],
    });
  }

  listarClientes() {
    this.clienteService.listarClientes().subscribe({
      next: (response) => {
        $('#clientSelect').select2({
          data: response.data.map((cliente) => ({
            id: cliente.identificacion,
            text: `${cliente.identificacion} - ${cliente.nombre}`,
          })),
        }).val(null).trigger('change');
      },
    });
  }

  crearCuenta(): void {
    if (this.cuentaForm.valid) {
      this.cuentaService.crearCuenta(this.cuentaForm.value).subscribe({
        next: () => {
          window.alert(MENSAJES.clienteCreado.mensaje);
          this.crear.emit();
        },
        error: (error) => this.errorHandlingService.handleErrors(error),
      });
    }
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
