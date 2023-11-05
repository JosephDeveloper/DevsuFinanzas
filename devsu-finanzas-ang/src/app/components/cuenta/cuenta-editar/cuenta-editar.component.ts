import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentaService } from '@app/services/cuenta.service';
import { Cuenta } from '@app/models/cuenta.model';
import { MENSAJES } from '@app/global/globals';
import { ErrorHandlingService } from '@app/services/error-handling.service';

@Component({
  selector: 'app-cuenta-editar',
  templateUrl: './cuenta-editar.component.html',
  styleUrls: ['./cuenta-editar.component.scss'],
})
export class CuentaEditarComponent {
  @Input() cuenta: Cuenta;
  @Output() cancelar = new EventEmitter<void>();
  @Output() editar = new EventEmitter<void>();
  cuentaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cuentaService: CuentaService,
    private errorHandlingService: ErrorHandlingService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.cuentaForm = this.formBuilder.group({
      numeroCuenta: [this.cuenta.numeroCuenta, Validators.required],
      tipoCuenta: [this.cuenta.tipoCuenta, Validators.required],
      saldoInicial: [this.cuenta.saldoInicial, Validators.required],
      estado: [this.cuenta.estado],
      // clienteId: [this.cuenta.clienteId.identificacion, Validators.required],
      clienteId: [{ value: this.cuenta.clienteId.identificacion, disabled: true }, Validators.required]
    });
  }

  actualizarCliente(): void {
    this.cuentaForm.get('clienteId').enable();
    this.cuentaForm.get('clienteId').setValue(this.cuenta.clienteId.id);
    if (this.cuentaForm.valid) {
      this.cuentaService
        .actualizarCuenta(this.cuenta.id, this.cuentaForm.value)
        .subscribe({
          next: () => {
            window.alert(MENSAJES.cuentaActualizada.mensaje);
            this.editar.emit();
          },
          error: (error) => this.errorHandlingService.handleErrors(error),
        });
    }
  }

  cancelarEdicion(): void {
    this.cancelar.emit();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.cancelarEdicion();
    }
  }

}
