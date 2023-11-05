import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { DataResponse } from '@app/models/data-response';
import { Movimiento } from '@app/models/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  private path = environment.apiUrl + 'movimientos';

  constructor(private http: HttpClient) { }

  listarMovimientos(): Observable<DataResponse> {
    return this.http.get<DataResponse>(this.path);
  }

  crearMovimiento(nuevoMovimiento: Movimiento): Observable<DataResponse> {
    return this.http.post<DataResponse>(this.path, nuevoMovimiento);
  }

}
