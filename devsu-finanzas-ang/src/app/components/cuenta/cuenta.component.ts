import { Component } from '@angular/core';
import { Cuenta } from '@app/models/cuenta.model';
import { CuentaService } from '@app/services/cuenta.service';
import { MENSAJES } from '@app/global/globals'
import { ErrorHandlingService } from '@app/services/error-handling.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss'],
})
export class CuentaComponent {
  cuentas: Cuenta[] = [];
  busqueda: string = '';
  crearModalVisible: boolean = false;
  editarModalVisible: boolean = false;
  cuentaData: Cuenta;
  mensajeEliminar: string = MENSAJES.cuentaEliminar.mensaje
  mostrarModalEliminarCuenta = false;

  constructor(
    private cuentaService: CuentaService,
    private errorHandlingService: ErrorHandlingService
  ) {}

  ngOnInit(): void {
    this.listarCuentas();
  }

  listarCuentas(): void {
    this.cuentaService.listarCuentas().subscribe({
      next: (response) => {
        this.cuentas = response.data;
      },
      error: (error) => this.errorHandlingService.handleErrors(error),
    });
  }

  filtrarCuentas(): Cuenta[] {
    if (!this.busqueda) {
      return this.cuentas; // Si el campo de búsqueda está vacío, mostrar todos los clientes
    }
    const busqueda = this.busqueda.toLowerCase();
    return this.cuentas.filter((cuentas) => {
      return (
        cuentas.numeroCuenta.toLowerCase().includes(busqueda) ||
        cuentas.tipoCuenta.toLowerCase().includes(busqueda) ||
        cuentas.clienteId.nombre.toLowerCase().includes(busqueda) ||
        (cuentas.estado ? 'activo' : 'inactivo').toLowerCase().includes(busqueda)
      );
    });
  }

  eliminarCuenta(id: number): void {
    if (id) {
      this.cuentaService.eliminarCuenta(id).subscribe({
        next: () => {
          this.listarCuentas()
        }, error: (error) => {
          this.errorHandlingService.handleErrors(error)
        }, complete: () => {
          this.mostrarModalEliminarCuenta = false
        }
      })
    }
  }

  showCrearCuentaModal(): void {
    this.crearModalVisible = true;
  }

  hideCrearCuentaModal(listar: boolean): void {
    if (listar) {
      this.listarCuentas()
    }
    this.crearModalVisible = false;
  }

  showEditarCuentaModal(cuentaData: Cuenta): void {
    this.cuentaData = cuentaData;
    this.editarModalVisible = true;
  }

  hideEditarCuentaModal(listar: boolean): void {
    if (listar) {
      this.listarCuentas()
    }
    this.editarModalVisible = false;
  }

  id: any

  confirmarEliminarCliente(cuentaData: Cuenta) {
    this.id = cuentaData.id
    this.mostrarModalEliminarCuenta = true;
  }

  onConfirmEliminar(id: number) {
    this.eliminarCuenta(id)
  }

  onCancelEliminar() {
    this.mostrarModalEliminarCuenta = false;
  }

}
