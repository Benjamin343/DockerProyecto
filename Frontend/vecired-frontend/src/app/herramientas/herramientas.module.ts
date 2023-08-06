import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvisosComponent } from './avisos/avisos.component';
import { AvisoPublicadoComponent } from './aviso-publicado/aviso-publicado.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { AcuerdosComunidadComponent } from './acuerdos-comunidad/acuerdos-comunidad.component';
import { AcuerdoPublicadoComponent } from './acuerdo-publicado/acuerdo-publicado.component';
import { VotacionPublicadaComponent } from './votacion-publicada/votacion-publicada.component';
import { AvisoModalComponent } from './aviso-modal/aviso-modal.component';
import { CuentaRegresivaComponent } from './cuenta-regresiva/cuenta-regresiva.component';
import { GraficoComponent } from './grafico/grafico.component';
import { CertificadoComponent } from './certificado/certificado.component';
import { CertificadoCreadoComponent } from './certificado-creado/certificado-creado.component';
import { EmisoresComponent } from './emisores/emisores.component';
import { EmisorCreadoComponent } from './emisor-creado/emisor-creado.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';



@NgModule({
  declarations:
  [
    AvisosComponent,
    AvisoPublicadoComponent,
    AcuerdosComunidadComponent,
    AcuerdoPublicadoComponent,
    VotacionPublicadaComponent,
    AvisoModalComponent,
    CuentaRegresivaComponent,
    GraficoComponent,
    CertificadoComponent,
    CertificadoCreadoComponent,
    EmisoresComponent,
    EmisorCreadoComponent,
    PublicacionComponent,
    PublicacionesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    FormsModule
  ],
  exports:[
    AvisosComponent,
    AcuerdosComunidadComponent,
    VotacionPublicadaComponent,
    AvisoModalComponent,
    CuentaRegresivaComponent,
    GraficoComponent,
    CertificadoComponent,
    EmisoresComponent,
    PublicacionComponent,
    PublicacionesComponent
  ]
})
export class HerramientasModule { }
