import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestCertPageRoutingModule } from './gest-cert-routing.module';

import { GestCertPage } from './gest-cert.page';
import { HerramientasModule } from 'src/app/herramientas/herramientas.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestCertPageRoutingModule,
    HerramientasModule
  ],
  declarations: [GestCertPage]
})
export class GestCertPageModule {}
