import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '@app/services/cliente.service';
import { Cliente } from '@app/models/cliente.model';
import { MENSAJES } from '@app/global/globals';
import { ErrorHandlingService } from '@app/services/error-handling.service';

@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.component.html',
  styleUrls: ['./cliente-editar.component.scss']
})
export class ClienteEditarComponent implements OnInit {
  @Input() cliente: Cliente
  @Output() cancelar = new EventEmitter<void>();
  @Output() editar = new EventEmitter<void>();
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
      nombre: [this.cliente.nombre, Validators.required],
      genero: [this.cliente.genero, Validators.required],
      edad: [this.cliente.edad, Validators.required],
      identificacion: [this.cliente.identificacion, Validators.required],
      direccion: [this.cliente.direccion, Validators.required],
      telefono: [this.cliente.telefono, Validators.required],
      contrasena: [this.cliente.contrasena, Validators.required],
      estado: [this.cliente.estado],
      clienteId: [this.cliente.clienteId],
    });
  }

  actualizarCliente(): void {
    if (this.clienteForm.valid) {
      this.clienteForm.patchValue({
        clienteId: this.clienteForm.value.identificacion
      });

      this.clienteService.actualizarCliente(this.cliente.id, this.clienteForm.value).subscribe({
        next: () => {
          window.alert(MENSAJES.clienteActualizado.mensaje)
          this.editar.emit();
        }, error: (error) => this.errorHandlingService.handleErrors(error)
      })
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
