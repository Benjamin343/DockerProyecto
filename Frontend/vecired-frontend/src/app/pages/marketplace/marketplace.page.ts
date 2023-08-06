import { Component, OnInit, ViewChild} from '@angular/core';
import { PublicacionService } from '../../servicios/publicacion.service';
import { Publicacion, PublicacionesCreadas, Comunidad, Usuario } from 'src/app/interfaces/interfaces';
import { DatePipe } from '@angular/common';
import { IonRefresher, IonSelect } from '@ionic/angular';
import { UsuarioService } from '../../servicios/usuario.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.page.html',
  styleUrls: ['./marketplace.page.scss'],
})
export class MarketplacePage implements OnInit {
  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild('sectionSelect', {static: false}) selectRef: IonSelect;


  publicaciones: PublicacionesCreadas[] = [];
  Comunidad: Comunidad[] = [];
  Idcomunidad = '';
  Idusuario = '';
  usuario: Usuario = {};
  contaRol = 0;
  disabledCrear=true;

  constructor( private publicacionService:  PublicacionService,
               private datePipe: DatePipe,
               private usuarioService: UsuarioService,
               private alertController: AlertController) { }


  ngOnInit() {
    this.siguientes();
  }


  formatearFecha(fecha: string): string{
    const fechaLocal = new Date(fecha);
    fechaLocal.setHours(fechaLocal.getHours() - 4);
    return this.datePipe.transform(fechaLocal, 'dd/MM/yyyy');
  }

  recargar(event?){
    this.publicaciones = [];
    this.siguientes(event);
  }

  siguientes( event?) {
    this.publicacionService.getPublicaciones().subscribe(
      (res) => {
        this.publicaciones.push( ...res['publicaciones'] );
        console.log(res);
        if(event){
          event.target.complete();
          if(res['publicaciones'].length === 0){
            event.target.disabled=true;
          }

        }
      },
      (error) =>{
        console.log('Error al obtener las publicaciones', error);
      }
    );
  }

  async mostrarSelect(event: Event){
    event.preventDefault();
    await this.obtenerComunidades();
    this.selectRef.open();

  }

  obtenerComunidades()
  {
    this.Comunidad = [];
    this.usuario = {};
    this.usuarioService.obtenerComunidadUsuario().subscribe(
      respuesta =>
      {
        this.Idusuario = respuesta['comunidades']._id;
        this.Comunidad.push(...respuesta['comunidades']['comunidad']);
        //Obtenemos el rol del usuario
        //cuando disabled crear es TRUE no se pueden crear avisos
        this.usuario = this.usuarioService.obtenerUsuario();

        if( String(this.usuario.comunidad) == '64a0d54909003038cecc7443' && respuesta['comunidades'].rol[0] == 2 )
        {
          this.disabledCrear = true;
        }else{
          this.disabledCrear = false;
        }

        this.actualizarTokenRequest();
      }
    );

  }

  async actualizarToken() {

    const alert = await this.alertController.create({
      header: 'Cambiar Comunidad',
      message: 'Estas seguro que quieres cambiar a una comunidad diferente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.Idcomunidad = '';
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.obtenerComunidades();
          }
        }
      ]
    });

    await alert.present();

  }

  async actualizarTokenRequest(){
    let aux = 0;
    this.Comunidad.forEach(
    item => {
        if(item._id == this.Idcomunidad)
        {
          this.contaRol = aux;
        }else{
          aux++;
        }
    });
    let sendData = {
        usuario: this.Idusuario,
        posicion: this.contaRol
    };
    const tokenActualizado = await this.usuarioService.actualizarToken(sendData);
    if(tokenActualizado){
        this.Idusuario = '';
        this.contaRol = null;
        this.recargar();
    }
    else{
        console.log('fallo');
    }

  }

}
