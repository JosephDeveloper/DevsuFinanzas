import { Component } from '@angular/core';
import { Movimiento } from '@app/models/movimiento.model';
import { MovimientoService } from '@app/services/movimiento.service';
import { MENSAJES } from '@app/global/globals';
import { ErrorHandlingService } from '@app/services/error-handling.service';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.scss'],
})
export class MovimientoComponent {
  movimientos: Movimiento[] = [];
  busqueda: any = '';
  crearModalVisible: boolean = false;
  movimientoData: Movimiento;

  constructor(
    private movimientoService: MovimientoService,
    private errorHandlingService: ErrorHandlingService
  ) {}

  ngOnInit(): void {
    this.listarCuentas();
  }

  listarCuentas(): void {
    this.movimientoService.listarMovimientos().subscribe({
      next: (response) => {
        this.movimientos = response.data;
      },
      error: (error) => this.errorHandlingService.handleErrors(error),
    });
  }

  filtrarMovimientos(): Movimiento[] {
    if (!this.busqueda) {
      return this.movimientos; // Si el campo de búsqueda está vacío, mostrar todos los clientes
    }
    const busqueda = this.busqueda.toLowerCase();
    return this.movimientos.filter((movimientos) => {

      return (
        this.formatearFecha(movimientos.fecha).includes(busqueda) ||
        movimientos.cuenta.clienteId.nombre.toLowerCase().includes(busqueda) ||
        movimientos.cuenta.numeroCuenta.toLowerCase().includes(busqueda) ||
        movimientos.tipoMovimiento.toLowerCase().includes(busqueda) ||
        (movimientos.cuenta.estado ? 'activo' : 'inactivo')
          .toLowerCase()
          .includes(busqueda)
      );
    });
  }

  formatearFecha(fecha: Date): string{
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
  }

  showCrearCuentaModal(): void {
    this.crearModalVisible = true;
  }

  hideCrearMovimientoModal(listar: boolean): void {
    if (listar) {
      this.listarCuentas()
    }
    this.crearModalVisible = false;
  }

}
