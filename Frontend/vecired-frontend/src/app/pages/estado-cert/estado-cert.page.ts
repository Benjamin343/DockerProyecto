import { Component, OnInit } from '@angular/core';
import { EmisorService } from 'src/app/servicios/emisor.service';
import { Emisor } from 'src/app/interfaces/interfaces';
import { AlertasService } from 'src/app/servicios/alertas.service';

@Component({
  selector: 'app-estado-cert',
  templateUrl: './estado-cert.page.html',
  styleUrls: ['./estado-cert.page.scss'],
})
export class EstadoCertPage implements OnInit {
  emisores: Emisor[] = [];
  emptySolicitud = false;
  mipagina= 1;
  finInfinito =false;
  
  constructor(private emisorService: EmisorService,
              private alertaService: AlertasService
              ) { }

  ngOnInit() {
   // this.emisorService.getmisEmisores().subscribe( resp =>{
    //  console.log(resp);
    //});
    //this.emisores = [];
    this.getmisEmisores();

  }

  getmisEmisores(event?, pull: boolean = false) {
    if (pull) {
      this.emisores = [];
      this.mipagina = 1;
    }

    this.emisorService.getmisEmisores(this.mipagina).subscribe((respuesta) => {
      const nuevosEmisores = respuesta['emisor'];

      if (pull) {
        this.emisores = nuevosEmisores;
      } else {
        this.emisores.push(...nuevosEmisores);
      }

      this.emptySolicitud = this.emisores.length === 0;
      this.mipagina++;
      if (event) {
        event.target.complete();
      }
    });
  }

  pull2refresh(event) {
   // console.log('Pull to refresh event triggered.');
    this.getmisEmisores(event, true);
  }

  infinito(event) {
    this.getmisEmisores(event);
  }

  evento(){
    this.alertaService.alerta('Esta esta funcionalidad aún no se encuentra desarrollada');
  }

}
