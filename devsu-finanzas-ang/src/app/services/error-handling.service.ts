import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Indica que este servicio será un servicio Singleton global
})
export class ErrorHandlingService {
  handleErrors(error: any): void {
    if (error.error && error.error.data && Array.isArray(error.error.data)) {
      const errorMessage = error.error.data.join('\n');
      window.alert(errorMessage);
    } else if (error.error) {
      window.alert(error.error);
    } else {
      window.alert('Ocurrió un error inesperado.');
    }
  }
}
