import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { DataResponse } from '@app/models/data-response';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private path = environment.apiUrl + 'reportes';

  constructor(private http: HttpClient) { }

  generarReporte(formData: any): Observable<DataResponse> {
    return this.http.get<DataResponse>(this.path, {params: formData});
  }

}
