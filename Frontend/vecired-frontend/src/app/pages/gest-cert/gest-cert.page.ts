import { Component, OnInit } from '@angular/core';
import { Emisor } from 'src/app/interfaces/interfaces';
import { EmisorService } from 'src/app/servicios/emisor.service';
import { AlertasService } from '../../servicios/alertas.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gest-cert',
  templateUrl: './gest-cert.page.html',
  styleUrls: ['./gest-cert.page.scss'],
})
export class GestCertPage implements OnInit {
  emisores: Emisor[] = [];
  emptySolicitud = false;
  infiniteScroll = true;
  pagina = 1;

  aceptar: any;
  rechazar: any;

  constructor(private emisorService: EmisorService,
              private alertaService: AlertasService
              ) {}

  ngOnInit() {
    this.emisores = [];
    this.obtenerSolicitudes();
    //console.log(this.emisores.length);
  }
  obtenerSolicitudes(event?) {
    this.emisorService.getEmisor(this.pagina).subscribe(
      (respuesta) => {
        const nuevosEmisores = respuesta['emisor'];

        if (nuevosEmisores.length === 0) {
          // se apaga el infinite scroll
          this.infiniteScroll = false;
          if (this.pagina === 1) {
            // Si la página es 1 y no hay solicitudes, se muestra que la comunidad no tiene más solicitudes
            this.emptySolicitud = true;
          }
          if (event) {
            event.target.complete();
          }
          return;
        }

        this.emisores = this.emisores.concat(nuevosEmisores);
        this.pagina++; // Increment the page number for infinite scroll.

        if (event) {
          event.target.complete();
        }
      },
      (error) => {
        console.error('Error al obtener las solicitudes:', error);
        if (event) {
          event.target.complete();
        }
      }
    );
  }

  cargarNuevos(event) {
    this.infiniteScroll = true;
    this.obtenerSolicitudes(event);
  }

  pull2refresh(event) {
    window.location.reload();
  }


  aprobarSolicitud(idSolicitud: string) {
    //console.log('vamos a aprobar la siguiente solicitud ' + idSolicitud);

    this.alertaService.alertaDecision('¿Desea aceptar a este usuario?').then(
      respuesta => {
        this.aceptar = respuesta['data'];
        if (this.aceptar === true) {
          this.emisorService.aceptarSolicitud(idSolicitud).subscribe(
            (respuesta) => {
             // console.log(respuesta);
              
              window.location.reload();
            },
            (error) => {
              console.error('Error al aprobar la solicitud: ', error);
            }
          );
        } else {
          this.alertaService.presentToast('Operación cancelada');
        }
      }
    );
  }

  rechazarSolicitud(idSolicitud: string) {
    //console.log('vamos a rechazar la siguiente solicitud ' + idSolicitud);

    this.alertaService.alertaDecision('¿Desea rechazar a este usuario?').then(
      respuesta => {
        this.aceptar = respuesta['data'];
        if (this.aceptar === true) {
          this.emisorService.rechazarSolicitud(idSolicitud).subscribe(
            (respuesta) => {
             // console.log(respuesta);

              window.location.reload();
            },
            (error) => {
              console.error('Error al rechazar la solicitud: ', error);
            }
          );
        } else {
          this.alertaService.presentToast('Operación cancelada');
        }
      }
    );
  }

}
