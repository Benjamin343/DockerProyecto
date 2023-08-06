import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './servicios/usuario.service';
import { AvisosService } from './servicios/avisos.service';
import { NavController, MenuController } from '@ionic/angular';
import { Usuario } from './interfaces/interfaces';
import { SolicitudService } from './servicios/solicitud.service';
import { PushService } from './servicios/push.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  rol;
  usuario: Usuario = {};
  largoSolicitud = 0;
  accordionAbierto: boolean = false; 
  accordionMarketplace: boolean = false;

  constructor( private usuarioService: UsuarioService,
               private avisosService: AvisosService,
               private navController: NavController,
               public menuCtrl: MenuController,
               private solicitudService: SolicitudService,
               private pushService: PushService) {}
  
  ngOnInit() 
  {
    this.pushService.OneSignalInit(); 
     
  }

  logout(){
    this.avisosService.contadorPagina = 0;
    this.usuarioService.logout();
  }

  goToMisAvisos()
  {
    this.navController.navigateRoot('/main/tabs/mis-avisos',{animated: true});

  }

  obtenerRolUsuario()
  {
    this.usuarioService.obtenerRolBD().subscribe(
      respuesta =>{
   
        this.rol = respuesta['currentRol'];
        if(this.rol == 1)
        {
          this.obtenerLargoSolicitud();
        }
       
      }
    )
  }

  obtenerLargoSolicitud()
  {
    this.solicitudService.obtenerLargoSolicitudes().subscribe(
      respuesta =>
      {
        this.largoSolicitud = respuesta['length'];
      }
    )
  }

  

  menuOpened()
  {
    
    this.obtenerRolUsuario();

    if(this.rol == 1)
    {
      this.obtenerLargoSolicitud();
    }
    
  }


  toggleMarketplace() {
    this.accordionMarketplace = !this.accordionMarketplace;
  }

  toggleCertificados() {
    this.accordionAbierto = !this.accordionAbierto;
  }

  formatearRut(rut: string): string {
    // Aquí realizamos el formateo del RUT (por ejemplo, "123456789" -> "12.345.678-9")
    // Suponemos que el RUT viene sin puntos ni guion.
    rut = rut.replace(/\./g, '');
    rut = rut.replace('-', '');

    const rutCuerpo = rut.slice(0, -1);
    const rutVerificador = rut.slice(-1);

    return rutCuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + rutVerificador;
  }


}
