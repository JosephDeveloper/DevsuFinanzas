import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  HostListener,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '@app/services/cliente.service';
import { MENSAJES } from '@app/global/globals';
import { ErrorHandlingService } from '@app/services/error-handling.service';

@Component({
  selector: 'app-cliente-crear',
  templateUrl: './cliente-crear.component.html',
  styleUrls: ['./cliente-crear.component.scss'],
})
export class ClienteCrearComponent implements OnInit {
  @Output() crear = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();
  clienteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private errorHandlingService: ErrorHandlingService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.clienteForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      genero: ['Femenino', Validators.required],
      edad: ['', Validators.required],
      identificacion: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      contrasena: ['', Validators.required],
      estado: [true],
      clienteId: [''],
    });
  }

  crearCliente(): void {
    if (this.clienteForm.valid) {
      this.clienteForm.patchValue({
        clienteId: this.clienteForm.value.identificacion,
      });

      this.clienteService.crearCliente(this.clienteForm.value).subscribe({
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
