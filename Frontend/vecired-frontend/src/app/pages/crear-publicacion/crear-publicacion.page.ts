import { Component, OnInit } from '@angular/core';
import { Comunidad, Usuario } from 'src/app/interfaces/interfaces';
import { PublicacionService } from '../../servicios/publicacion.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.page.html',
  styleUrls: ['./crear-publicacion.page.scss'],
})


export class CrearPublicacionPage implements OnInit {

  publicacion ={
    titulo: '',
    descripcion: '',
    precio: '',
    categoria: '',
    imagenes: []
  };

  usuario: Usuario = {};
  comunidad: Comunidad = {};

  constructor(private publicacionService: PublicacionService,
              private alertaService: AlertasService,
              private ruta: Router) { }

  ngOnInit() {

  }

  async crearPubl(){

    const validado = this.validacion();

    if(validado==null){

      const nuevaPublicacion = await this.publicacionService.crearPublicacion(this.publicacion);

      this.publicacion={
        titulo: '',
        descripcion: '',
        precio: '',
        categoria: '',
        imagenes: []
      };

      this.ruta.navigateByUrl('main/tabs/marketplace');
      this.alertaService.presentToast('Publicacion creada exitosamente');

    }


  }

  validacion()
  {
    //Validación caracteres extraños en nombre
    var caracteres = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{3,50})+$/g;
    const precioNumero = parseFloat(this.publicacion.precio);

    if(caracteres.test(this.publicacion.titulo) == false){

    return this.alertaService.alerta('El título no permite tener caracteres especiales');
  }

    if(this.publicacion.titulo.length > 50)
    {
    return this.alertaService.alerta('Título demasiado largo');
    }

    if(this.publicacion.titulo.length <= 3)
    {
    return this.alertaService.alerta('Título debe tener más de 3 caracteres');
    }

    if(this.publicacion.descripcion.length > 1200)
    {
      return this.alertaService.alerta('Descripción demasiada larga');
    }
    if(this.publicacion.descripcion.length <= 2)
    {
      return this.alertaService.alerta('Descripción debe tener más de 3 caracteres');
    }
    if(isNaN(precioNumero) || precioNumero < 0){
      return this.alertaService.alerta('El precio debe ser un número válido y no puede ser negativo');
    }
    if(this.publicacion.imagenes.length > 5){
      return this.alertaService.alerta('El número máximo de imágenes permitidas es 5');
    }

    return null;

  }

  onFileSelected(event: any){
    this.publicacion.imagenes = event.target.files;
  }

}
