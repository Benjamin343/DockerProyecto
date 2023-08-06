import { Component, OnInit } from '@angular/core';
import { EmisorService } from 'src/app/servicios/emisor.service';
import { Emisor } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { RutService } from 'src/app/servicios/rut.service';
import { Usuario } from '../../interfaces/interfaces';
import {validate} from 'rut.js';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-solicitar-cert',
  templateUrl: './solicitar-cert.page.html',
  styleUrls: ['./solicitar-cert.page.scss'],
})
export class SolicitarCertPage implements OnInit {
  emisor: Emisor = {
    rut: '',
    motivo: '',
    certificado: {} 
  };
  
  usuario: Usuario = {};
  comparador: '';

  constructor(private emisorService: EmisorService,
              private ruta: Router,
              private alertaService: AlertasService,
              private rutService: RutService,
              private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.obtenerCertificado(); 
   // console.log(this.usuario.rut);
    this.obtener();
  }

  obtener(){
    this.usuario = this.usuarioService.obtenerUsuario();
  }


  obtenerCertificado() {
    this.emisorService.Objeto.subscribe((respuesta: any) => {
      //Limpiamos el certificado con agua y con jabon
      this.emisor= {
        rut: '',
        motivo:''
      }

      this.emisor.certificado = respuesta;
  
      //console.log(this.emisor); 
    });
  }
  
 /*
  crearPost() {
    console.log(this.emisor.rut);
    console.log(this.emisor.motivo);
    console.log(this.emisor.certificado);

  }
*/


  async crearCert()
   {
     const validado = this.validacion();

     if(validado == null)
     {
       const nuevoEmisor = await this.emisorService.crearSolicitud(this.emisor);

      
      //Vaciamos las variables para limpiar los campos
      this.emisor = {
        rut: '',
        motivo: '',
        certificado: {},
      };


      this.ruta.navigateByUrl('main/tabs/tab1');
      this.alertaService.presentToast('Certificado creado exitosamente');
     }

     
   }

   validacion()
   {
     //Validación caracteres extraños en descripcion
     var caracteres = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{1,250})+$/g;

 
     if(caracteres.test(this.emisor.motivo) == false){
      
      return this.alertaService.alerta('El motivo no permite tener caracteres especiales');
    }
      if(!validate(this.emisor.rut)){
        return this.alertaService.alerta('el RUT ingresado no es valido');
    }
    if(this.emisor.rut !== this.usuario.rut){
      return this.alertaService.alerta('El RUT ingresado no corresponde con el usuario');
  }

     return null;
 
   }


   formatearRut(rut: string): string {
    return this.rutService.formatearRut(rut); // Llamamos a la función del servicio
  }


}
