import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RutService {

  constructor() { }

  formatearRut(rut: string): string {
    // Aquí realizamos el formateo del RUT (por ejemplo, "123456789" -> "12.345.678-9")
    // Suponemos que el RUT viene sin puntos ni guion.
    rut = rut.replace(/\./g, '');
    rut = rut.replace('-', '');

    const rutCuerpo = rut.slice(0, -1);
    const rutVerificador = rut.slice(-1);

    let formateo = rutCuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    formateo += '-' + rutVerificador.toUpperCase(); // Convertimos el dígito verificador a mayúsculas

    return formateo;
  }

}