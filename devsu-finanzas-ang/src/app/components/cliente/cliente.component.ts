import { Component } from '@angular/core';
import { Cliente } from '@app/models/cliente.model';
import { ClienteService } from '@app/services/cliente.service';
import { MENSAJES } from '@app/global/globals'
import { ErrorHandlingService } from '@app/services/error-handling.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {
  clientes: Cliente[] = [];
  busqueda: string = '';
  nuevoCliente: Cliente = {} as Cliente;
  crearModalVisible: boolean = false;
  editarModalVisible: boolean = false;
  clienteData: Cliente;
  mensajeEliminar: string = MENSAJES.clienteEliminar.mensaje
  mostrarModalEliminarCliente = false;

  constructor(
    private clienteService: ClienteService,
    private errorHandlingService: ErrorHandlingService
    ) { }

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes(): void {
    this.clienteService.listarClientes().subscribe({
      next: (response) => {
        this.clientes = response.data;
    }, error: (error) => this.errorHandlingService.handleErrors(error)
    })
  }

  filtrarClientes(): Cliente[] {
    if (!this.busqueda) {
      return this.clientes; // Si el campo de búsqueda está vacío, mostrar todos los clientes
    }
    const busqueda = this.busqueda.toLowerCase();
    return this.clientes.filter((cliente) => {
      return (
        cliente.nombre.toLowerCase().includes(busqueda) ||
        cliente.direccion.toLowerCase().includes(busqueda) ||
        cliente.telefono.toLowerCase().includes(busqueda) ||
        cliente.contrasena.toLowerCase().includes(busqueda) ||
        (cliente.estado ? 'activo' : 'inactivo').toLowerCase().includes(busqueda)
      );
    });
  }

  eliminarCliente(id: number): void {
    if (id) {
      this.clienteService.eliminarCliente(id).subscribe({
        next: () => {
          this.listarClientes
        }, error: (error) => {
          this.errorHandlingService.handleErrors(error)
          this.onCancelEliminar()
        }, complete: () => {
          this.mostrarModalEliminarCliente = false
        }
      })
    }
  }

  showCrearClienteModal(): void {
    this.crearModalVisible = true;
  }

  hideCrearClienteModal(listar: boolean): void {
    if (listar) {
      this.listarClientes()
    }
    this.crearModalVisible = false;
  }

  showEditarClienteModal(clienteData: Cliente): void {
    this.clienteData = clienteData;
    this.editarModalVisible = true;
  }

  hideEditarClienteModal(listar: boolean): void {
    if (listar) {
      this.listarClientes()
    }
    this.editarModalVisible = false;
  }

  id: any

  confirmarEliminarCliente(clienteData: Cliente) {
    this.id = clienteData.id
    this.mostrarModalEliminarCliente = true;
  }

  onConfirmEliminar(id: number) {
    this.eliminarCliente(id)
  }

  onCancelEliminar() {
    this.mostrarModalEliminarCliente = false;
  }

}
