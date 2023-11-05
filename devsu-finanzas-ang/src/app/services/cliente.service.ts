import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { DataResponse } from '@app/models/data-response';
import { Cliente } from '@app/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private path = environment.apiUrl + 'clientes';

  constructor(private http: HttpClient) { }

  listarClientes(): Observable<DataResponse> {
    return this.http.get<DataResponse>(this.path);
  }

  crearCliente(nuevoCliente: Cliente): Observable<DataResponse> {
    return this.http.post<DataResponse>(this.path, nuevoCliente);
  }

  actualizarCliente(idCliente: number, clienteDTO: Cliente): Observable<DataResponse> {
    return this.http.put<DataResponse>(`${this.path}/${idCliente}`, clienteDTO);
  }

  eliminarCliente(idCliente: number): Observable<void> {
    return this.http.delete<void>(`${this.path}/${idCliente}`);
  }

}
