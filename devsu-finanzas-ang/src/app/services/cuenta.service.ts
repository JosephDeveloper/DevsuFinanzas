import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { DataResponse } from '@app/models/data-response';
import { Cuenta } from '@app/models/cuenta.model';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private path = environment.apiUrl + 'cuentas';

  constructor(private http: HttpClient) { }

  listarCuentas(): Observable<DataResponse> {
    return this.http.get<DataResponse>(this.path);
  }

  crearCuenta(nuevoCuenta: Cuenta): Observable<DataResponse> {
    return this.http.post<DataResponse>(this.path, nuevoCuenta);
  }

  actualizarCuenta(idCuenta: number, cuentaDTO: Cuenta): Observable<DataResponse> {
    return this.http.put<DataResponse>(`${this.path}/${idCuenta}`, cuentaDTO);
  }

  eliminarCuenta(idCuenta: number): Observable<void> {
    return this.http.delete<void>(`${this.path}/${idCuenta}`);
  }

}
