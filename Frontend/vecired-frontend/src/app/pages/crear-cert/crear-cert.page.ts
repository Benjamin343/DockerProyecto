import { Component, OnInit } from '@angular/core';
import { Comunidad, Usuario} from '../../interfaces/interfaces';
import { CertificadoService } from '../../servicios/certificado.service';
import { AlertasService } from '../../servicios/alertas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cert',
  templateUrl: './crear-cert.page.html',
  styleUrls: ['./crear-cert.page.scss'],
})
export class CrearCertPage implements OnInit {

  certificado ={
    titulo: '',
    descripcion: '',
    replegal: '',
    contacto:''

  };

  usuario: Usuario = {};
  comunidad: Comunidad={};

  constructor(private certificadoService: CertificadoService,
              private alertaService: AlertasService,
              private ruta: Router
              ) { }


  ngOnInit() {


  }



  async crearCert()
   {
     const validado = this.validacion();

     if(validado == null)
     {
       const nuevoCertificado = await this.certificadoService.crearNuevoCertificado(this.certificado);

      
      //Vaciamos las variables para limpiar los campos
      this.certificado = {
        titulo: '',
        descripcion: '',
        replegal: '',
        contacto:''
      };


      this.ruta.navigateByUrl('main/tabs/mis-certificados');
      this.alertaService.presentToast('Certificado creado exitosamente');
     }

     
   }

   validacion()
   {
     //Validación caracteres extraños en nombre
     var caracteres = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{3,50})+$/g;
     var caracterescelular = /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/;
     var caracteresrep = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{3,30})+$/g;
 
     if(caracteres.test(this.certificado.titulo) == false){
      
      return this.alertaService.alerta('El título no permite tener caracteres especiales');
    }

     if(this.certificado.titulo.length > 50)
     {
      return this.alertaService.alerta('Título demasiado largo');
     }
 
     if(this.certificado.titulo.length <= 3)
     {
      return this.alertaService.alerta('Título debe tener más de 3 caracteres');
     }
 
     if(this.certificado.descripcion.length > 1200)
     {
       return this.alertaService.alerta('Descripción demasiada larga');
     }
     if(this.certificado.descripcion.length <= 2)
     {
       return this.alertaService.alerta('Descripción debe tener más de 3 caracteres');
     }
     if(caracterescelular.test(this.certificado.contacto) == false){
      return this.alertaService.alerta('El formato de celular ingresado no es valido, recuerde agregar el +569 al inicio.');
     }
     if(caracteresrep.test(this.certificado.replegal) == false){
      return this.alertaService.alerta('El nombre no puede tener caracteres especiales');
     }
     if(this.certificado.replegal.length < 3){
      return this.alertaService.alerta('El nombre del representante es demasiado corto.');
     }
     if(this.certificado.replegal.length > 30){
      return this.alertaService.alerta('El nombre del representante es demasiado largo.');
     }

     return null;
 
   }

}
