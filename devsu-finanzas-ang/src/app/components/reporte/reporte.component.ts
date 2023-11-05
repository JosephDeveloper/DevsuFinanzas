import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReporteService } from '@app/services/reporte.service';
import { ErrorHandlingService } from '@app/services/error-handling.service';
import * as $ from 'jquery';
import 'select2';
import { ClienteService } from '@app/services/cliente.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
})
export class ReporteComponent {
  reporteForm: FormGroup;
  pdfBase64: string;

  constructor(
    private formBuilder: FormBuilder,
    private reporteService: ReporteService,
    private clienteService: ClienteService,
    private errorHandlingService: ErrorHandlingService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.listarClientes();

    $('#clientSelect').on('change', (event) => {
      const selectedValue = event.target.value;
      this.reporteForm.get('idCliente').setValue(selectedValue);
    });
  }

  inicializarFormulario(): void {
    this.reporteForm = this.formBuilder.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      idCliente: [0, Validators.required],
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

  generarReporte() {
    console.log(this.reporteForm.value)
    this.reporteService
      .generarReporte(this.reporteForm.value)
      .subscribe({
        next: (response) => {
          this.pdfBase64 = response.data.pdfBase64;
        }, error: (error) => this.errorHandlingService.handleErrors(error),
      })
  }

  limpiarForm(){
    this.reporteForm.reset()
    $('#clientSelect').val(null).trigger('change');
  }
}
