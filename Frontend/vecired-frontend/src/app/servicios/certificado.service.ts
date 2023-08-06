import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';
import { CertificadosCreados, Certificado } from '../interfaces/interfaces'; // Importa la interfaz Comunidad
import { ReplaySubject } from 'rxjs';
const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {
  nuevoCertificado = new EventEmitter<Certificado>();
  Objeto = new ReplaySubject<{}>();
  
  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  getCertificados() {
    const headers = new HttpHeaders({
      'UToken': this.usuarioService.userToken
    });
    return this.http.get<CertificadosCreados>(`${url}/certificados/`, { headers });
  }


  crearNuevoCertificado(certificado)
  {
    const headers = new HttpHeaders({
      'UToken': this.usuarioService.userToken
    })

    return new Promise( resolve =>
      {
        this.http.post(`${url}/certificados/crear`, certificado,{headers}).subscribe( respuesta =>
          {
            console.log(respuesta);
            this.nuevoCertificado.emit(respuesta['certificado']);
            resolve(true);
          })

      });

    // PARA LA TESIS SE DEBE AGREGAR LA LOGICA PARA EL MANEJO DE IMAGEN

  }

  enviarDatos(datos)
  {
    const aux = datos;
    this.Objeto.next(aux);
  }

  //funcion para actualizar un certificado
  actualizarCertificado(certificado: Certificado)
  {
    const headers = new HttpHeaders({
      'UToken': this.usuarioService.userToken
    })

    return new Promise(resolve =>
      {
        this.http.post(`${url}/certificados/update`, certificado,{headers}).subscribe(
          respuesta =>
          {
            if(respuesta['ok'])
            {
              this.nuevoCertificado.emit(respuesta['certificado']);
              resolve(true);
            }else
            {
              resolve(false);
            }
          }
        )
      })
  }
}