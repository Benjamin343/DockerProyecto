import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitarCertPageRoutingModule } from './solicitar-cert-routing.module';

import { SolicitarCertPage } from './solicitar-cert.page';
import { HerramientasModule } from 'src/app/herramientas/herramientas.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitarCertPageRoutingModule,
    HerramientasModule
  ],
  declarations: [SolicitarCertPage]
})
export class SolicitarCertPageModule {}
