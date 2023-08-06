import { Component, OnInit, Input } from '@angular/core';
import { Emisor } from 'src/app/interfaces/interfaces';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { EmisorService } from '../../servicios/emisor.service';

@Component({
  selector: 'app-emisor-creado',
  templateUrl: './emisor-creado.component.html',
  styleUrls: ['./emisor-creado.component.scss'],
})
export class EmisorCreadoComponent implements OnInit {
  @Input() emisor: Emisor= {
    usuario: {},
    rut: '',
    motivo: '',
    fechaemision: '',
    certificado: {},
    comunidad: {}
  };

  emisores: Emisor[] = [];

  aceptar: any;
  rechazar: any;

  constructor( private alertaService: AlertasService,
                private emisorService: EmisorService) { }

  ngOnInit() {
    //console.log(this.emisor);
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

