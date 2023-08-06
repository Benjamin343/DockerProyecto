import { Component, OnInit } from '@angular/core';
import { CertificadoService } from '../../servicios/certificado.service';
import { Certificado, Usuario } from 'src/app/interfaces/interfaces';
import { Router, NavigationExtras } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AlertController } from '@ionic/angular';
import { EmisorService } from 'src/app/servicios/emisor.service';
import { ComunidadService } from 'src/app/servicios/comunidad.service';
import { RespuestaComunidad } from 'src/app/interfaces/interfaces';
import { AlertasService } from 'src/app/servicios/alertas.service';

@Component({
  selector: 'app-mis-certificados',
  templateUrl: './mis-certificados.page.html',
  styleUrls: ['./mis-certificados.page.scss'],
})
export class MisCertificadosPage implements OnInit {
  certificados: Certificado[] = []; // Inicializamos como un arreglo vacío para evitar undefined.
  emptyCertificados: boolean = false;

  emisor ={
    rut: '',
    motivo: '',
    certificado: ''
  };

  Roltype = [];
  usuario: Usuario = {};
  mostrarInputMensaje = false;
  aux;
  noVerificado = false;
  
  constructor(private certificadoService: CertificadoService,
              private ruta: Router,
              private usuarioService: UsuarioService,
              private alertController: AlertController,
              private emisorService: EmisorService,
              private comunidadService: ComunidadService,
              private alertaService: AlertasService
              ) { }

  ngOnInit() {
    this.loadCertificados(); // Cargamos los certificados al entrar en la página.
  }

  
  ionViewDidEnter() {
    this.loadCertificados(); // Llamamos a la función al entrar en la página.
    //this.obtenerRol();
    this.obtenerRolUsuario();
    this.puedeEmitir();
  }

  obtenerRolUsuario(){
    this.usuario = this.usuarioService.obtenerRolUsuario();
    this.Roltype[0] = this.usuario.rol;
    //console.log(this.usuario.rol);
    
  }

  puedeEmitir() {
    this.comunidadService.obtenerComunidad().subscribe(
      (datos: RespuestaComunidad) => {
        this.aux = datos.puedeEmitir;
      },
      (error) => {
        // Manejo de errores :3
        console.error('Este es el error: ', error);
      }
    );
  }

  loadCertificados() {
    this.certificadoService.getCertificados().subscribe(resp => {
      //console.log(resp);
      this.certificados = resp.certificados || [];
      this.emptyCertificados = this.certificados.length === 0; 
      //console.log(this.certificados); 
      this.emisor = {
        rut: '',
        motivo: '¡Hola!, me gustaria unirme a tu comunidad',
        certificado:''
      }
      this.mostrarInputMensaje = false;

  
    });
  }

  async NavegarCrearCertificado()
  {
    //console.log(id);
    //this.ruta.navigateByUrl('/main/tabs/crear-cert');

    if(this.Roltype[0] === 2 && this.aux === 1){
      this.alertaService.alerta('Solo personas de la directiva pueden crear certificados.');

    }if(this.Roltype[0] === 1 && this.aux === 0){
      this.alertaService.alerta('Su comunidad no esta verificada para emitir certificados.');
    }if(this.Roltype[0] === 2 && this.aux ===0){
      this.alertaService.alerta('Esta comunidad no se encuentra verificada.');
    
    }if(this.Roltype[0] === 1 && this.aux ===1) {
      this.ruta.navigateByUrl('main/tabs/crear-cert');
    }
  
    
  }

  async editarCerticado(certificado) {
    if (this.Roltype[0] === 2) {
      const alert = await this.alertController.create({
        message: 'Solo personas de la directiva tienen permiso para editar el certificado.',
        buttons: ['OK']
      });
  
      await alert.present();
    } else {
      // Si el rol no es dos se procede
      //console.log('VAMOOOOOOOOO');
      this.certificadoService.enviarDatos(certificado);
      //console.log(certificado);
      // redireccionamos al usuario a editar-certificado
      this.ruta.navigateByUrl('main/tabs/editar-certificado');
    }
  }

  async emitirCertificado(id) {

    this.emisorService.enviarDatos(id); // Envía directamente el id en lugar de this.emisor
    this.ruta.navigateByUrl('main/tabs/solicitar-cert');
  }
}
