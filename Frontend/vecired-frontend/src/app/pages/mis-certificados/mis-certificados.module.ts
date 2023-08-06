import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisCertificadosPageRoutingModule } from './mis-certificados-routing.module';

import { MisCertificadosPage } from './mis-certificados.page';
import { HerramientasModule } from 'src/app/herramientas/herramientas.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisCertificadosPageRoutingModule,
    HerramientasModule

  ],
  declarations: [MisCertificadosPage]
})
export class MisCertificadosPageModule {}
