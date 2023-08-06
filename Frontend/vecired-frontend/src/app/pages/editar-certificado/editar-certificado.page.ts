import { Component, OnInit } from '@angular/core';
import { Certificado } from 'src/app/interfaces/interfaces';
import { CertificadoService } from 'src/app/servicios/certificado.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-editar-certificado',
  templateUrl: './editar-certificado.page.html',
  styleUrls: ['./editar-certificado.page.scss'],
})
export class EditarCertificadoPage implements OnInit {
  certificadoEdit: Certificado = {
    titulo: '',
    descripcion: '',
    replegal: '',
    contacto: '',
  };

  usuario: Usuario = {};
  Roltype = [];
  constructor( private certificadoService: CertificadoService,
                private alertasService: AlertasService,
                private navController: NavController) { }

  ngOnInit() {
    //console.log(this.certificadoEdit);
    this.obtenerAvisoEditar();
  }

  obtenerAvisoEditar()
  {
    this.certificadoService.Objeto.subscribe( respuesta =>
      {
        this.certificadoEdit = respuesta;

        //console.log(this.certificadoEdit);
      })
  }

  async editarCertificado()
  {
    const validado = this.validacion();

    if(validado == null)
    {
      //console.log('click' + this.avisoEdicion.descripcion + this.avisoEdicion.titulo + this.avisoEdicion.tipoAviso);
      const actualizado = await this.certificadoService.actualizarCertificado(this.certificadoEdit);

      if(actualizado)
      {
        this.Roltype = [];
        this.usuario = {};
        this.certificadoEdit = {
          titulo: '',
          descripcion: '',
          replegal: '',
          contacto: ''
        };
      this.navController.navigateRoot('/main/tabs/mis-certificados',{animated: true});
      this.alertasService.presentToast('Certificado actualizado exitosamente'); 
      }else
      {
      this.alertasService.presentToast('El certificado no se pudo actualizar'); 
      }
    }
  }

  validacion()
  {
     //Validación caracteres extraños en nombre
     var caracteres = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{3,50})+$/g;
     var caracteres2 = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9¡!?¿@-_.,/()= ]{1,1200})+$/g;
     var caracterescelular = /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/;

     if(caracteres.test(this.certificadoEdit.titulo) == false)
     {
      return this.alertasService.alerta('El título no permite tener caracteres especiales');
     }
 
    if(caracteres2.test(this.certificadoEdit.descripcion) == false)
    {
      return this.alertasService.alerta('La descripción no permite tener caracteres especiales');
    }
    if(this.certificadoEdit.titulo.length > 50)
    {
      return this.alertasService.alerta('Título demasiado largo');
    }

    if(this.certificadoEdit.titulo.length <= 3)
    {
      return this.alertasService.alerta('Título debe tener más de 3 caracteres');
    }
 
    if(this.certificadoEdit.descripcion.length >= 1200)
    {
      return this.alertasService.alerta('Descripción demasiada larga');
    }

    if(this.certificadoEdit.descripcion.length <= 2)
    {
      return this.alertasService.alerta('Descripción debe tener más de caracteres');
    }
    if(caracterescelular.test(this.certificadoEdit.contacto) == false)
    {
      return this.alertasService.alerta('Formato de celular no válido, intente de nuevo, recuerde agregar +569 al inicio');
    }

    return null;
  }


}
