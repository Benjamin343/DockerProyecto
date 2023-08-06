import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoCertPageRoutingModule } from './estado-cert-routing.module';

import { EstadoCertPage } from './estado-cert.page';
import { HerramientasModule } from 'src/app/herramientas/herramientas.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadoCertPageRoutingModule,
    HerramientasModule
  ],
  declarations: [EstadoCertPage]
})
export class EstadoCertPageModule {}
