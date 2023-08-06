import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmisorCreados } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { ReplaySubject } from 'rxjs';
import { Emisor } from '../interfaces/interfaces';
import { AlertasService } from './alertas.service';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class EmisorService {

  nuevaSolicitud = new EventEmitter();
  Objeto = new ReplaySubject<{}>();
  nuevoEmisor = new EventEmitter<Emisor>();

  constructor(private http: HttpClient, private usuarioService: UsuarioService,
              private alertaService: AlertasService) {}

  getEmisor(pagina: number) {
    const headers = new HttpHeaders({
      'UToken': this.usuarioService.userToken
    });

    return this.http.get<EmisorCreados>(`${url}/emisor/solicitudes?pagina=${pagina}`, { headers });
  }


  aceptarSolicitud(idSolicitud: string) {
    const headers = new HttpHeaders({
      'UToken': this.usuarioService.userToken
    });

    const solicitud = { _id: idSolicitud };
    this.alertaService.presentToast('Solicitud aceptada exitosamente');
    return this.http.post(`${url}/emisor/aceptar`, solicitud, { headers });
  }

  rechazarSolicitud(idSolicitud: string) {
    const headers = new HttpHeaders({
      'UToken': this.usuarioService.userToken
    });

    const solicitud = { _id: idSolicitud };
    this.alertaService.presentToast('Solicitud rechazada exitosamente');
    return this.http.post(`${url}/emisor/rechazar`, solicitud, { headers });
  }

  getmisEmisores(pagina: number) {
    const headers = new HttpHeaders({
      'UToken': this.usuarioService.userToken,
    });

    return this.http.get<EmisorCreados>(`${url}/emisor/miscertificados?pagina=${pagina}`, { headers });
  }

  crearSolicitud(emisor){
    const headers = new HttpHeaders({
      'UToken': this.usuarioService.userToken,
    });

     return new Promise( resolve =>
      {
        this.http.post(`${url}/emisor/solicitud`, emisor,{headers}).subscribe( respuesta =>
          {
            console.log(respuesta);
            this.nuevoEmisor.emit(respuesta['emisor']);
            resolve(true);
          })

      });

  }



  enviarDatos(datos) {
    const aux = datos;
    this.Objeto.next(aux);
  }

}
