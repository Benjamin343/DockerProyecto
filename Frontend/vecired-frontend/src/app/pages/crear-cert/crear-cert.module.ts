import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearCertPageRoutingModule } from './crear-cert-routing.module';

import { CrearCertPage } from './crear-cert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearCertPageRoutingModule
  ],
  declarations: [CrearCertPage]
})
export class CrearCertPageModule {}
